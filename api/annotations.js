// Annotation store: GET list / POST add / PATCH edit-or-resolve / DELETE remove.
// Persists a single JSON blob in the public Vercel Blob store linked to this project.
import { put, list } from '@vercel/blob';

const KEY = 'annotations.json';

async function load() {
  const { blobs } = await list({ prefix: KEY });
  const b = blobs.find((x) => x.pathname === KEY);
  if (!b) return [];
  const res = await fetch(b.url, { cache: 'no-store' });
  if (!res.ok) return [];
  try { return await res.json(); } catch { return []; }
}

async function save(data) {
  await put(KEY, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8');
  try { return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      return res.status(200).json(await load());
    }
    if (req.method === 'POST') {
      const b = await readBody(req);
      if (!b.page || typeof b.x !== 'number' || typeof b.y !== 'number') {
        return res.status(400).json({ error: 'page, x, y required' });
      }
      const data = await load();
      const item = {
        id: uid(), page: String(b.page), x: b.x, y: b.y,
        note: (b.note || '').toString().slice(0, 2000),
        author: (b.author || '').toString().slice(0, 80),
        done: false, created: new Date().toISOString(),
      };
      data.push(item);
      await save(data);
      return res.status(200).json(item);
    }
    if (req.method === 'PATCH') {
      const b = await readBody(req);
      const data = await load();
      const it = data.find((d) => d.id === b.id);
      if (it) {
        if (b.note !== undefined) it.note = String(b.note).slice(0, 2000);
        if (b.done !== undefined) it.done = !!b.done;
      }
      await save(data);
      return res.status(200).json(it || {});
    }
    if (req.method === 'DELETE') {
      const b = await readBody(req);
      const data = (await load()).filter((d) => d.id !== b.id);
      await save(data);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message || e) });
  }
}
