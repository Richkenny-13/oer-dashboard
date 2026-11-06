// Local stand-in for Vercel so the dashboard can be checked before a push: node scripts/dev-server.js -> http://localhost:4173
// Not used by Vercel. No Redis env vars locally, so it runs in defaults-only mode.
// Minimal local stand-in for Vercel: maps /api/<name> to the serverless handlers
// and serves public/ statically. No Redis env vars set -> defaults-only mode.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = require("path").join(__dirname, "..");
const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.svg':'image/svg+xml' };
function mkRes(res){
  const r = { status(c){ res.statusCode=c; return r; }, json(o){ res.setHeader('Content-Type','application/json'); res.end(JSON.stringify(o)); }, end(x){ res.end(x); } };
  return r;
}
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname.startsWith('/api/')) {
    const name = url.pathname.slice(5).replace(/[^a-z-]/g,'');
    const file = path.join(ROOT, 'api', name + '.js');
    if (!fs.existsSync(file)) { res.statusCode=404; return res.end('no such api'); }
    delete require.cache[require.resolve(file)];
    for (const k of Object.keys(require.cache)) if (k.includes('oer-web')) delete require.cache[k];
    let body=''; req.on('data', c => body += c);
    req.on('end', async () => {
      req.body = body ? (()=>{ try { return JSON.parse(body); } catch { return body; } })() : undefined;
      try { await require(file)(req, mkRes(res)); } catch (e) { res.statusCode=500; res.end(JSON.stringify({error:e.message})); }
    });
    return;
  }
  let p = url.pathname === '/' ? '/index.html' : url.pathname;
  const file = path.join(ROOT, 'public', p);
  if (!fs.existsSync(file)) { res.statusCode=404; return res.end('not found'); }
  res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(4173, () => console.log('OER dev server on http://localhost:4173'));
