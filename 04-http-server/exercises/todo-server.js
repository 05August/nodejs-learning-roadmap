// todo-server.js - Bài tập: Todo REST API Server
const http = require('http');
const url = require('url');

// In-memory storage
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build HTTP Server', completed: true }
];
let nextId = 3;

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);
  const path = parsedUrl.pathname;

  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log(`${method} ${path}`);

  // Routes
  if (method === 'GET' && path === '/todos') {
    // TODO: Trả về danh sách todos
    res.statusCode = 200;
    res.end(JSON.stringify(todos));
  }
  else if (method === 'POST' && path === '/todos') {
    // TODO: Tạo todo mới
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { title } = JSON.parse(body);
        const newTodo = {
          id: nextId++,
          title,
          completed: false
        };
        todos.push(newTodo);
        res.statusCode = 201;
        res.end(JSON.stringify(newTodo));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
  else if (method === 'PUT' && path.startsWith('/todos/')) {
    // TODO: Cập nhật todo
    const id = parseInt(path.split('/')[2]);
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Todo not found' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        todos[todoIndex] = { ...todos[todoIndex], ...updates };
        res.statusCode = 200;
        res.end(JSON.stringify(todos[todoIndex]));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
  else if (method === 'DELETE' && path.startsWith('/todos/')) {
    // TODO: Xóa todo
    const id = parseInt(path.split('/')[2]);
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Todo not found' }));
      return;
    }

    todos.splice(todoIndex, 1);
    res.statusCode = 204;
    res.end();
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Todo Server running on http://localhost:${PORT}`);
  console.log('📝 API Endpoints:');
  console.log('  - GET /todos');
  console.log('  - POST /todos');
  console.log('  - PUT /todos/:id');
  console.log('  - DELETE /todos/:id');
}); 