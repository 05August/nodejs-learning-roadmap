# 🚀 Bài 5: Express.js Basics

## 🎯 Mục tiêu học
- Hiểu Express.js framework và tại sao sử dụng
- Thiết lập Express application cơ bản
- Làm việc với routing và HTTP methods
- Xử lý request và response objects
- Middleware pattern cơ bản

## ❓ Câu Hỏi Trọng Tâm

Sau khi học xong bài này, bạn phải trả lời được:

🔍 **Câu hỏi cơ bản:**
- Express.js là gì và tại sao popular?
- Framework khác gì với built-in HTTP module?
- Routing trong Express hoạt động như thế nào?

🔍 **Câu hỏi nâng cao:**
- Middleware pattern có lợi ích gì?
- Request và Response objects có những methods nào quan trọng?
- Express application lifecycle hoạt động ra sao?

🔍 **Câu hỏi thực hành:**
- Cách setup một Express app từ đầu?
- Làm thế nào để handle different HTTP methods?
- Cách xử lý query parameters và route parameters?

## 📚 Nội dung chính

### 1. Express.js Introduction
- Minimal web framework cho Node.js
- Benefits so với pure Node.js HTTP
- Express ecosystem và middleware
- Installation và setup

### 2. Application Setup
- Creating Express app
- Basic server configuration
- Environment setup
- Static files serving

### 3. Routing Basics
- Route methods (GET, POST, PUT, DELETE)
- Route paths và patterns
- Route parameters
- Query strings handling

### 4. Request & Response
- Request object properties
- Response methods
- Status codes
- Headers manipulation

## 🛠️ Thực hành

### Basic Express App
```javascript
// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Routing Examples
```javascript
// GET route
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST route
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ 
    message: 'User created',
    user: { name, email }
  });
});

// Route with parameters
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get user ${id}` });
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, limit } = req.query;
  res.json({ query: q, limit: limit || 10 });
});
```

### Middleware Example
```javascript
// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date()}`);
  next();
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## 📋 Bài tập thực hành

### Bài tập 1: Personal Info API
- Tạo API endpoints để quản lý thông tin cá nhân
- GET /profile - trả về thông tin profile
- PUT /profile - cập nhật thông tin
- Validation cơ bản cho input

### Bài tập 2: Simple Blog API
- GET /posts - danh sách bài viết
- GET /posts/:id - chi tiết bài viết
- POST /posts - tạo bài viết mới
- DELETE /posts/:id - xóa bài viết

### Bài tập 3: Calculator API
- POST /calculate - thực hiện phép tính
- Support các phép: +, -, *, /
- Error handling cho invalid input
- History endpoint để xem lịch sử tính toán

## 🔗 Liên kết với bài khác
- **Trước đó**: Bài 4 - HTTP Server
- **Tiếp theo**: Bài 6 - Middleware
- **Dự án**: Todo API (sử dụng Express)

---
⏰ **Thời gian**: 3-4 ngày | 🎯 **Mức độ**: Trung bình 