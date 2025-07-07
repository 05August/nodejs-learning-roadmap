// simple-server.js - Ví dụ HTTP server cơ bản
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  console.log(`${method} ${path}`);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Routing
  if (method === 'GET' && path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>🚀 Node.js HTTP Server</h1><p>Server đang chạy!</p>');
  } 
  else if (method === 'GET' && path === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' }
    ]));
  }
  else if (method === 'GET' && path === '/api/time') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      time: new Date().toISOString(),
      timestamp: Date.now()
    }));
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log('📝 Available endpoints:');
  console.log('  - GET /');
  console.log('  - GET /api/users');
  console.log('  - GET /api/time');
}); 