// Generation Faraday review app — single backend endpoint.
// Auth (sessions), users, invites (admin), notes, comments.
// Storage: ONE Blob per entity (u/<id>, i/<token>, n/<id>, c/<id>) so independent
// writes never collide — avoids the lost-update problem of a single shared doc.
import { put, list, head, del } from '@vercel/blob';
import crypto from 'node:crypto';

const SECRET = process.env.SESSION_SECRET || 'dev-insecure-secret';
const COOKIE = 'gf_session';
const WEEK = 60 * 60 * 24 * 7;
const MAIN_ADMIN = 'ryan@mosequipment.com';
const RYAN_ID = 'ryan-main';
const U = (id) => `u/${id}.json`, I = (t) => `i/${t}.json`, N = (id) => `n/${id}.json`, C = (id) => `c/${id}.json`;

// ---------- per-entity blob helpers ----------
async function putJSON(path, obj) {
  await put(path, JSON.stringify(obj), { access: 'public', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 0 });
  return obj;
}
async function getJSON(path) {
  let h; try { h = await head(path); } catch { return null; }
  try { const r = await fetch(h.url + '?_=' + Date.now() + Math.random().toString(36).slice(2), { cache: 'no-store' }); return r.ok ? await r.json() : null; } catch { return null; }
}
async function listJSON(prefix) {
  const { blobs } = await list({ prefix, limit: 1000 });
  const out = await Promise.all(blobs.map(async (b) => {
    try { const r = await fetch(b.url + '?_=' + Date.now() + Math.random().toString(36).slice(2), { cache: 'no-store' }); return r.ok ? await r.json() : null; } catch { return null; }
  }));
  return out.filter(Boolean);
}
async function delBlob(path) { try { const h = await head(path); await del(h.url); } catch {} }

// ---------- crypto ----------
const uid = () => crypto.randomBytes(8).toString('hex');
function hashPw(pw, salt) { salt = salt || crypto.randomBytes(16).toString('hex'); return { salt, hash: crypto.scryptSync(pw, salt, 64).toString('hex') }; }
function verifyPw(pw, salt, hash) { const h = crypto.scryptSync(pw, salt, 64).toString('hex'); const a = Buffer.from(h), b = Buffer.from(hash); return a.length === b.length && crypto.timingSafeEqual(a, b); }
function makeUser(email, name, pw, role, id) { const { salt, hash } = hashPw(pw); return { id: id || uid(), email: email.toLowerCase().trim(), name: name || email, salt, passHash: hash, role, created: new Date().toISOString() }; }
const sign = (p) => crypto.createHmac('sha256', SECRET).update(p).digest('base64url');
function makeToken(userId) { const p = Buffer.from(JSON.stringify({ u: userId, e: Math.floor(Date.now() / 1000) + WEEK })).toString('base64url'); return p + '.' + sign(p); }
function readToken(token) {
  if (!token) return null;
  const [p, s] = token.split('.'); if (!p || !s || sign(p) !== s) return null;
  let o; try { o = JSON.parse(Buffer.from(p, 'base64url').toString()); } catch { return null; }
  if (!o.e || o.e < Math.floor(Date.now() / 1000)) return null;
  return o.u;
}
function getCookie(req, name) { const m = (req.headers.cookie || '').match(new RegExp('(?:^|; )' + name + '=([^;]+)')); return m ? decodeURIComponent(m[1]) : null; }
function setCookie(res, token) { res.setHeader('Set-Cookie', `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${WEEK}`); }
function clearCookie(res) { res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`); }
const pub = (u) => u && { id: u.id, email: u.email, name: u.name, role: u.role };
async function readBody(req) { if (req.body && typeof req.body === 'object') return req.body; const c = []; for await (const x of req) c.push(x); const raw = Buffer.concat(c).toString('utf8'); try { return raw ? JSON.parse(raw) : {}; } catch { return {}; } }

async function ensureSeed() {
  const r = await getJSON(U(RYAN_ID));
  if (!r) await putJSON(U(RYAN_ID), makeUser(MAIN_ADMIN, 'Ryan', process.env.ADMIN_INIT_PASSWORD || 'changeme123', 'admin', RYAN_ID));
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  try {
    await ensureSeed();
    const body = req.method === 'GET' ? {} : await readBody(req);
    const action = (req.query && req.query.action) || body.action || (req.method === 'GET' ? 'bootstrap' : '');
    const meId = readToken(getCookie(req, COOKIE));
    const me = meId ? await getJSON(U(meId)) : null;

    // ----- public -----
    if (action === 'login') {
      const email = (body.email || '').toLowerCase().trim();
      const u = (await listJSON('u/')).find((x) => x.email === email);
      if (!u || !verifyPw(body.password || '', u.salt, u.passHash)) return res.status(401).json({ error: 'Invalid email or password' });
      setCookie(res, makeToken(u.id));
      return res.json({ user: pub(u) });
    }
    if (action === 'invite-info') {
      const inv = await getJSON(I(body.token || (req.query && req.query.token)));
      const ok = inv && !inv.used;
      return res.json({ valid: !!ok, email: ok ? inv.email : null, role: ok ? inv.role : null });
    }
    if (action === 'accept-invite') {
      const inv = await getJSON(I(body.token));
      if (!inv || inv.used) return res.status(400).json({ error: 'This invite is invalid or already used.' });
      if ((await listJSON('u/')).find((u) => u.email === inv.email.toLowerCase())) return res.status(400).json({ error: 'An account with this email already exists.' });
      if ((body.password || '').length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });
      const u = makeUser(inv.email, (body.name || '').trim() || inv.email, body.password, inv.role || 'member');
      await putJSON(U(u.id), u);
      inv.used = true; inv.usedAt = new Date().toISOString(); await putJSON(I(inv.token), inv);
      setCookie(res, makeToken(u.id));
      return res.json({ user: pub(u) });
    }

    if (action === 'bootstrap') {
      const notes = await listJSON('n/');
      const comments = await listJSON('c/');
      let users, invites;
      if (me && me.role === 'admin') { users = (await listJSON('u/')).map(pub); invites = await listJSON('i/'); }
      return res.json({ user: pub(me), notes, comments, users, invites });
    }

    if (!me) return res.status(401).json({ error: 'Not signed in' });
    if (action === 'logout') { clearCookie(res); return res.json({ ok: true }); }
    if (action === 'me') return res.json({ user: pub(me) });

    // ----- notes -----
    if (action === 'add-note') {
      if (!body.page || typeof body.x !== 'number' || typeof body.y !== 'number') return res.status(400).json({ error: 'page, x, y required' });
      const n = { id: uid(), page: String(body.page), x: body.x, y: body.y, note: (body.note || '').toString().slice(0, 2000), authorId: me.id, authorName: me.name, done: false, created: new Date().toISOString() };
      await putJSON(N(n.id), n); return res.json(n);
    }
    if (action === 'update-note') {
      const n = await getJSON(N(body.id)); if (!n) return res.status(404).json({ error: 'not found' });
      if (n.authorId !== me.id && me.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
      if (body.note !== undefined) n.note = String(body.note).slice(0, 2000);
      if (body.done !== undefined) n.done = !!body.done;
      await putJSON(N(n.id), n); return res.json(n);
    }
    if (action === 'delete-note') {
      const n = await getJSON(N(body.id)); if (!n) return res.status(404).json({ error: 'not found' });
      if (n.authorId !== me.id && me.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
      await delBlob(N(n.id));
      const cs = (await listJSON('c/')).filter((c) => c.noteId === n.id);
      await Promise.all(cs.map((c) => delBlob(C(c.id))));
      return res.json({ ok: true });
    }

    // ----- comments -----
    if (action === 'add-comment') {
      const n = await getJSON(N(body.noteId)); if (!n) return res.status(404).json({ error: 'note not found' });
      const c = { id: uid(), noteId: body.noteId, text: (body.text || '').toString().slice(0, 2000), authorId: me.id, authorName: me.name, created: new Date().toISOString() };
      await putJSON(C(c.id), c); return res.json(c);
    }
    if (action === 'delete-comment') {
      const c = await getJSON(C(body.id)); if (!c) return res.status(404).json({ error: 'not found' });
      if (c.authorId !== me.id && me.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
      await delBlob(C(c.id)); return res.json({ ok: true });
    }

    // ----- admin -----
    if (me.role !== 'admin') return res.status(403).json({ error: 'admin only' });
    if (action === 'create-invite') {
      const email = (body.email || '').toLowerCase().trim();
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Valid email required' });
      if ((await listJSON('u/')).find((u) => u.email === email)) return res.status(400).json({ error: 'A user with that email already exists' });
      const inv = { token: crypto.randomBytes(16).toString('hex'), email, role: body.role === 'admin' ? 'admin' : 'member', invitedBy: me.email, created: new Date().toISOString(), used: false };
      await putJSON(I(inv.token), inv);
      return res.json({ invite: inv });
    }
    if (action === 'revoke-invite') { await delBlob(I(body.token)); return res.json({ ok: true }); }
    if (action === 'list') { return res.json({ users: (await listJSON('u/')).map(pub), invites: await listJSON('i/') }); }
    if (action === 'delete-user') {
      const u = await getJSON(U(body.id)); if (!u) return res.status(404).json({ error: 'not found' });
      if (u.email === MAIN_ADMIN) return res.status(400).json({ error: 'Cannot remove the main admin' });
      await delBlob(U(u.id)); return res.json({ ok: true });
    }
    if (action === 'set-role') {
      const u = await getJSON(U(body.id)); if (!u) return res.status(404).json({ error: 'not found' });
      if (u.email === MAIN_ADMIN) return res.status(400).json({ error: 'Cannot change the main admin' });
      u.role = body.role === 'admin' ? 'admin' : 'member'; await putJSON(U(u.id), u); return res.json({ ok: true });
    }

    return res.status(400).json({ error: 'unknown action: ' + action });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
