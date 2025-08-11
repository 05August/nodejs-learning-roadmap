# 🌐 Bài 4: HTTP Server

## 🎯 Mục Tiêu
- Tạo HTTP server cơ bản
- Xử lý HTTP requests/responses
- Routing đơn giản
- Serve static files

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **HTTP request/response cycle hoạt động như thế nào?**
- Client gửi yêu cầu HTTP (phương thức, URL, header, body) tới server.
- Server xử lý yêu cầu, tạo phản hồi.
- Server trả phản hồi HTTP (mã trạng thái, header, body).
- Client xử lý phản hồi, hiển thị nội dung hoặc thực hiện tác vụ.
- Chu kỳ lặp lại khi có yêu cầu mới.
2. **Sự khác biệt giữa các HTTP methods (GET, POST, PUT, DELETE)?**
- GET: Lấy dữ liệu từ server (ví dụ: tải trang web). An toàn, không thay đổi dữ liệu, có thể lưu cache.
- POST: Gửi dữ liệu đến server để tạo mới (ví dụ: gửi biểu mẫu). Không an toàn, không lưu cache, dữ liệu thường trong body.
- PUT: Cập nhật hoặc thay thế dữ liệu hiện có trên server (ví dụ: chỉnh sửa thông tin). Không an toàn, có thể lặp lại (idempotent).
- DELETE: Xóa tài nguyên trên server (ví dụ: xóa bài đăng). Không an toàn, có thể lặp lại (idempotent).
3. **Status codes quan trọng nào cần nhớ (200, 404, 500...)?**
- 200 OK: Yêu cầu thành công, server trả về dữ liệu mong muốn.
- 201 Created: Yêu cầu (thường là POST) tạo tài nguyên mới thành công.
- 204 No Content: Yêu cầu thành công nhưng không có nội dung trả về (thường dùng cho DELETE).
- 400 Bad Request: Yêu cầu không hợp lệ (lỗi cú pháp, thiếu tham số).
- 401 Unauthorized: Yêu cầu cần xác thực, client chưa đăng nhập hoặc không có quyền.
- 403 Forbidden: Client không có quyền truy cập tài nguyên, dù đã xác thực.
- 404 Not Found: Tài nguyên yêu cầu không tồn tại trên server.
- 500 Internal Server Error: Lỗi server không xác định, thường do lỗi xử lý bên server.
- 503 Service Unavailable: Server tạm thời không hoạt động (bảo trì hoặc quá tải).

### 🔍 Câu hỏi nâng cao
4. **Làm thế nào để server handle multiple concurrent requests?**
- Multithreading: Server tạo một luồng (thread) riêng cho mỗi yêu cầu. Mỗi luồng xử lý độc lập, phù hợp với các ứng dụng như Apache. Tuy nhiên, tốn tài nguyên nếu số lượng yêu cầu lớn.
- Event-Driven Architecture (Non-blocking I/O): Server sử dụng vòng lặp sự kiện (event loop) để xử lý nhiều yêu cầu trong một luồng, như Node.js. Thay vì chờ I/O (như truy vấn database), server tiếp tục xử lý yêu cầu khác, tối ưu tài nguyên.
- Asynchronous Programming: Sử dụng các cơ chế như async/await hoặc promises để xử lý yêu cầu không đồng bộ, giảm thời gian chờ. Phổ biến trong các framework như Express (Node.js) hoặc FastAPI (Python).
- Load Balancing: Phân phối yêu cầu đến nhiều server thông qua load balancer (ví dụ: Nginx, HAProxy). Đảm bảo không server nào bị quá tải.
- Connection Pooling: Duy trì một nhóm kết nối (connection pool) đến database hoặc dịch vụ khác, giảm thời gian thiết lập kết nối mới cho mỗi yêu cầu.
- Scale server
5. **Tại sao cần set proper headers và làm thế nào để set chúng?**
- Kiểm soát hành vi: Điều khiển cache (Cache-Control), xác thực (Authorization), hoặc định dạng dữ liệu (Content-Type).
- Bảo mật: Thiết lập chính sách như CORS (Access-Control-Allow-Origin) hoặc ngăn chặn tấn công (X-Content-Type-Options).
- Hiệu suất: Giảm tải với cache hoặc nén dữ liệu (Content-Encoding).
- Tương thích: Đảm bảo client và server hiểu nhau (Accept, Content-Type). Ví dụ: Thiếu header Content-Type có thể khiến server hiểu sai định dạng dữ liệu (JSON, HTML, v.v.).
6. **Cách implement basic routing mà không dùng framework?**
```
// Định nghĩa routes như một object
const routes = {
  'GET /': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home Page\n');
  },
  'GET /about': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About Page\n');
  },
  'POST /data': (req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: body }));
    });
  },
  // Route mặc định cho lỗi
  default: (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
};

const server = http.createServer((req, res) => {
  const key = `${req.method} ${req.url}`; // Kết hợp method + URL
  const handler = routes[key] || routes.default;
  handler(req, res);
});
```

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
