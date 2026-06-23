// Edge middleware: HTTP Basic Auth on the whole site so it isn't public.
// Credentials come from env (SITE_USER / SITE_PASS) set in the Vercel project.
export const config = {
  // Run on everything except Vercel internals.
  matcher: ['/((?!_vercel/).*)'],
};

export default function middleware(req) {
  const USER = process.env.SITE_USER || 'faraday';
  const PASS = process.env.SITE_PASS || 'changeme';

  const header = req.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try { decoded = atob(encoded); } catch { decoded = ''; }
    const i = decoded.indexOf(':');
    const u = decoded.slice(0, i);
    const p = decoded.slice(i + 1);
    if (u === USER && p === PASS) {
      return; // authorized -> continue to the requested resource
    }
  }
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Generation Faraday", charset="UTF-8"',
    },
  });
}
