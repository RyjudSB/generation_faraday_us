// Generation Faraday review app — single backend endpoint.
// Handles: session auth, users, invites (admin), notes, and comments.
// State lives in one public Vercel Blob JSON document (low-concurrency review tool).
import { put, list } from '@vercel/blob';
import crypto from 'node:crypto';

const KEY = 'appdata.json';
const SECRET = process.env.SESSION_SECRET || 'dev-insecure-secret';
const COOKIE = 'gf_session';
const WEEK = 60 * 60 * 24 * 7;
const MAIN_ADMIN = 'ryan@mosequipment.com';

// ---------- storage ----------
async function blobUrl() {
  const { blobs } = await list({ prefix: KEY });
  const b = blobs.find((x) => x.pathname === KEY);
  return b ? b.url : null;
}
async function save(d) {
  await put(KEY, JSON.stringify(d), {
    access: 'public', contentType: 'application/json',
    addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 0,
  });
}
async function load() {
  let d = null;
  const url = await blobUrl();
  if (url) {
    // Cache-bust: the public Blob URL is CDN-cached, so a plain fetch can return
    // a stale copy right after a write (lost updates). A unique query key forces origin.
    const bust = url + (url.includes('?') ? '&' : '?') + '_=' + Date.now() + Math.random().toString(36).slice(2);
    const r = await fetch(bust, { cache: 'no-store' });
    if (r.ok) { try { d = await r.json(); } catch {} }
  }
  if (!d || typeof d !== 'object') d = {};
  d.users = d.users || []; d.invites = d.invites || []; d.notes = d.notes || []; d.comments = d.comments || [];
  if (!d.users.length) {
    d.users.push(makeUser(MAIN_ADMIN, 'Ryan', process.env.ADMIN_INIT_PASSWORD || 'changeme123', 'admin'));
    await save(d);
  }
  return d;
}

// ---------- crypto / sessions ----------
const uid = () => crypto.randomBytes(8).toString('hex');
function hashPw(pw, salt) { salt = salt || crypto.randomBytes(16).toString('hex'); return { salt, hash: crypto.scryptSync(pw, salt, 64).toString('hex') }; }
function verifyPw(pw, salt, hash) { const h = crypto.scryptSync(pw, salt, 64).toString('hex'); const a = Buffer.from(h), b = Buffer.from(hash); return a.length === b.length && crypto.timingSafeEqual(a, b); }
function makeUser(email, name, pw, role) { const { salt, hash } = hashPw(pw); return { id: uid(), email: email.toLowerCase().trim(), name: name || email, salt, passHash: hash, role, created: new Date().toISOString() }; }
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

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  try {
    const data = await load();
    const body = req.method === 'GET' ? {} : await readBody(req);
    const action = (req.query && req.query.action) || body.action || (req.method === 'GET' ? 'bootstrap' : '');
    const meId = readToken(getCookie(req, COOKIE));
    const me = meId ? data.users.find((u) => u.id === meId) : null;

    // ----- public -----
    if (action === 'login') {
      const email = (body.email || '').toLowerCase().trim();
      const u = data.users.find((x) => x.email === email);
      if (!u || !verifyPw(body.password || '', u.salt, u.passHash)) return res.status(401).json({ error: 'Invalid email or password' });
      setCookie(res, makeToken(u.id));
      return res.json({ user: pub(u) });
    }
    if (action === 'invite-info') {
      const tok = body.token || (req.query && req.query.token);
      const inv = data.invites.find((i) => i.token === tok && !i.used);
      return res.json({ valid: !!inv, email: inv ? inv.email : null, role: inv ? inv.role : null });
    }
    if (action === 'accept-invite') {
      const inv = data.invites.find((i) => i.token === body.token && !i.used);
      if (!inv) return res.status(400).json({ error: 'This invite is invalid or already used.' });
      if (data.users.find((u) => u.email === inv.email.toLowerCase())) return res.status(400).json({ error: 'An account with this email already exists.' });
      if ((body.password || '').length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });
      const u = makeUser(inv.email, (body.name || '').trim() || inv.email, body.password, inv.role || 'member');
      data.users.push(u); inv.used = true; inv.usedAt = new Date().toISOString();
      await save(data); setCookie(res, makeToken(u.id));
      return res.json({ user: pub(u) });
    }

    // bootstrap works logged-out (returns user:null) so the client can react
    if (action === 'bootstrap') {
      return res.json({
        user: pub(me), notes: data.notes, comments: data.comments,
        users: me && me.role === 'admin' ? data.users.map(pub) : undefined,
        invites: me && me.role === 'admin' ? data.invites : undefined,
      });
    }

    if (!me) return res.status(401).json({ error: 'Not signed in' });
    if (action === 'logout') { clearCookie(res); return res.json({ ok: true }); }
    if (action === 'me') return res.json({ user: pub(me) });

    // ----- notes -----
    if (action === 'add-note') {
      if (!body.page || typeof body.x !== 'number' || typeof body.y !== 'number') return res.status(400).json({ error: 'page, x, y required' });
      const n = { id: uid(), page: String(body.page), x: body.x, y: body.y, note: (body.note || '').toString().slice(0, 2000), authorId: me.id, authorName: me.name, done: false, created: new Date().toISOString() };
      data.notes.push(n); await save(data); return res.json(n);
    }
    if (action === 'update-note') {
      const n = data.notes.find((x) => x.id === body.id); if (!n) return res.status(404).json({ error: 'not found' });
      if (n.authorId !== me.id && me.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
      if (body.note !== undefined) n.note = String(body.note).slice(0, 2000);
      if (body.done !== undefined) n.done = !!body.done;
      await save(data); return res.json(n);
    }
    if (action === 'delete-note') {
      const n = data.notes.find((x) => x.id === body.id); if (!n) return res.status(404).json({ error: 'not found' });
      if (n.authorId !== me.id && me.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
      data.notes = data.notes.filter((x) => x.id !== body.id);
      data.comments = data.comments.filter((c) => c.noteId !== body.id);
      await save(data); return res.json({ ok: true });
    }

    // ----- comments -----
    if (action === 'add-comment') {
      const n = data.notes.find((x) => x.id === body.noteId); if (!n) return res.status(404).json({ error: 'note not found' });
      const c = { id: uid(), noteId: body.noteId, text: (body.text || '').toString().slice(0, 2000), authorId: me.id, authorName: me.name, created: new Date().toISOString() };
      data.comments.push(c); await save(data); return res.json(c);
    }
    if (action === 'delete-comment') {
      const c = data.comments.find((x) => x.id === body.id); if (!c) return res.status(404).json({ error: 'not found' });
      if (c.authorId !== me.id && me.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
      data.comments = data.comments.filter((x) => x.id !== body.id); await save(data); return res.json({ ok: true });
    }

    // ----- admin -----
    if (me.role !== 'admin') return res.status(403).json({ error: 'admin only' });
    if (action === 'create-invite') {
      const email = (body.email || '').toLowerCase().trim();
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Valid email required' });
      if (data.users.find((u) => u.email === email)) return res.status(400).json({ error: 'A user with that email already exists' });
      const inv = { token: crypto.randomBytes(16).toString('hex'), email, role: body.role === 'admin' ? 'admin' : 'member', invitedBy: me.email, created: new Date().toISOString(), used: false };
      data.invites.push(inv); await save(data);
      return res.json({ invite: inv });
    }
    if (action === 'revoke-invite') { data.invites = data.invites.filter((i) => i.token !== body.token); await save(data); return res.json({ ok: true }); }
    if (action === 'list') { return res.json({ users: data.users.map(pub), invites: data.invites }); }
    if (action === 'delete-user') {
      const u = data.users.find((x) => x.id === body.id); if (!u) return res.status(404).json({ error: 'not found' });
      if (u.email === MAIN_ADMIN) return res.status(400).json({ error: 'Cannot remove the main admin' });
      data.users = data.users.filter((x) => x.id !== body.id); await save(data); return res.json({ ok: true });
    }
    if (action === 'set-role') {
      const u = data.users.find((x) => x.id === body.id); if (!u) return res.status(404).json({ error: 'not found' });
      if (u.email === MAIN_ADMIN) return res.status(400).json({ error: 'Cannot change the main admin' });
      u.role = body.role === 'admin' ? 'admin' : 'member'; await save(data); return res.json({ ok: true });
    }

    return res.status(400).json({ error: 'unknown action: ' + action });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
