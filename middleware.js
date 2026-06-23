// Edge middleware: gate the whole site behind a logged-in session.
// Verifies the gf_session cookie (HMAC, same scheme as /api/app) and redirects
// unauthenticated visitors to /login.html. The API handles its own auth.
export const config = { matcher: ['/((?!_vercel/).*)'] };

const COOKIE = 'gf_session';
const PUBLIC = new Set(['/login.html', '/invite.html', '/genf-logo.png', '/favicon.ico', '/nav.css']);

function b64url(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function pad(s) { return s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4); }

async function valid(token, secret) {
  if (!token) return false;
  const [p, s] = token.split('.');
  if (!p || !s) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(p));
  if (b64url(new Uint8Array(sig)) !== s) return false;
  try {
    const obj = JSON.parse(atob(pad(p)));
    if (!obj.e || obj.e < Math.floor(Date.now() / 1000)) return false;
  } catch { return false; }
  return true;
}

export default async function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname;
  if (path.startsWith('/api/')) return;        // API endpoints authenticate themselves
  if (PUBLIC.has(path)) return;

  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(new RegExp('(?:^|; )' + COOKIE + '=([^;]+)'));
  const token = m ? decodeURIComponent(m[1]) : null;
  if (await valid(token, process.env.SESSION_SECRET || 'dev-insecure-secret')) return;

  // Not signed in -> send to login (remember where they were going)
  const login = new URL('/login.html', req.url);
  if (path && path !== '/') login.searchParams.set('next', path + url.search);
  return Response.redirect(login, 302);
}
