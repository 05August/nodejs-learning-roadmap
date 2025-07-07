# 🌐 Bài 4: HTTP Server

## 🎯 Mục Tiêu
- Tạo HTTP server cơ bản
- Xử lý HTTP requests/responses
- Routing đơn giản
- Serve static files

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **HTTP request/response cycle hoạt động như thế nào?**
2. **Sự khác biệt giữa các HTTP methods (GET, POST, PUT, DELETE)?**
3. **Status codes quan trọng nào cần nhớ (200, 404, 500...)?**

### 🔍 Câu hỏi nâng cao
4. **Làm thế nào để server handle multiple concurrent requests?**
5. **Tại sao cần set proper headers và làm thế nào để set chúng?**
6. **Cách implement basic routing mà không dùng framework?**

### 🔍 Câu hỏi thực hành
7. **Tạo một REST API server với CRUD operations?**
8. **Implement file upload server với validation?**
9. **Làm thế nào để serve static files efficiently?**

## 📖 Kiến Thức Cơ Bản

### Tạo HTTP Server
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Request và Response
```javascript
const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  
  // Send response
  res.statusCode = 200;
  res.end(JSON.stringify({ method, url }));
});
```

### Routing
```javascript
const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  if (method === 'GET' && url === '/') {
    res.end('Home Page');
  } else if (method === 'GET' && url === '/about') {
    res.end('About Page');
  } else {
    res.statusCode = 404;
    res.end('Page Not Found');
  }
});
```

## 💻 Ví Dụ Thực Tế

### 1. Simple HTTP Server
### 2. JSON API Server
### 3. Static File Server

## 🚀 Bài Tập

### Bài 1: Basic Web Server
### Bài 2: REST API
### Bài 3: File Upload Server

## 📚 Tài Liệu
- [Node.js HTTP](https://nodejs.org/api/http.html)

---
⏰ **Thời gian**: 3-4 ngày | 🎯 **Mức độ**: Trung bình 