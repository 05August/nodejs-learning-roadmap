# 📋 Todo API

Dự án đầu tiên trong roadmap học Node.js. Một REST API hoàn chỉnh để quản lý danh sách công việc với cấu trúc chuyên nghiệp.

## 🎯 Mục tiêu dự án

- Học cách xây dựng REST API với Express.js
- Thực hành với File System để lưu trữ dữ liệu
- Hiểu về middleware và error handling
- Áp dụng validation và testing
- Làm quen với architecture pattern MVC

## 📚 Kiến thức cần có

- Node.js basics (Bài 1)
- NPM và Modules (Bài 2)
- File System (Bài 3)
- HTTP Server (Bài 4)
- Express.js Basics (Bài 5)

## 🚀 Tính năng

- ✅ CRUD operations cho todos
- ✅ Filter và sort todos
- ✅ Validation dữ liệu với Joi
- ✅ Error handling middleware
- ✅ Rate limiting
- ✅ Security middleware (Helmet, CORS)
- ✅ Logging với Morgan
- ✅ Health check endpoint
- ✅ Statistics endpoint
- ✅ Unit testing với Jest

## 📁 Cấu trúc dự án

```
01-todo-api/
├── src/
│   ├── controllers/     # Business logic
│   │   └── todoController.js
│   ├── routes/         # API routes
│   │   └── todoRoutes.js
│   ├── models/         # Data models
│   │   └── todoModel.js
│   ├── middleware/     # Custom middleware
│   │   └── errorMiddleware.js
│   ├── config/         # Configuration
│   │   └── config.js
│   ├── data/           # JSON data storage
│   │   └── todos.json
│   └── app.js          # Main app file
├── tests/              # Test files
│   └── todo.test.js
├── package.json
├── .gitignore
└── README.md
```

## 🛠️ Hướng dẫn setup

### 1. Cài đặt dependencies
```bash
cd projects/01-todo-api
npm install
```

### 2. Tạo file environment (tuỳ chọn)
```bash
# Tạo file .env
NODE_ENV=development
PORT=3000
DATA_FILE=./src/data/todos.json
CORS_ORIGIN=*
```

### 3. Chạy project
```bash
# Development server (với nodemon)
npm run dev

# Production server
npm start

# Chạy tests
npm test

# Chạy tests với watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format
```

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Health Check
```http
GET /health
```

#### Todos Management

**Lấy tất cả todos**
```http
GET /api/v1/todos
```

Query Parameters:
- `completed` (boolean): Filter by completion status
- `priority` (string): Filter by priority (low, medium, high)
- `sortBy` (string): Sort by field (createdAt, updatedAt, title, priority)
- `order` (string): Sort order (asc, desc)

**Lấy todo theo ID**
```http
GET /api/v1/todos/:id
```

**Tạo todo mới**
```http
POST /api/v1/todos
Content-Type: application/json

{
  "title": "Learn Node.js",
  "description": "Complete the Node.js roadmap",
  "priority": "high",
  "dueDate": "2024-12-31T23:59:59.999Z"
}
```

**Cập nhật todo**
```http
PUT /api/v1/todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
```

**Xóa todo**
```http
DELETE /api/v1/todos/:id
```

**Thống kê todos**
```http
GET /api/v1/todos/stats
```

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

**Error Response:**
```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

## 🧪 Testing

```bash
# Chạy tất cả tests
npm test

# Chạy tests với coverage
npm run test -- --coverage

# Chạy specific test file
npm test -- todo.test.js
```

## 🔧 Validation Rules

### Todo Creation
- `title` (required): 1-100 characters
- `description` (optional): max 500 characters
- `priority` (optional): 'low', 'medium', 'high' (default: 'medium')
- `dueDate` (optional): ISO date string

### Todo Update
- All fields are optional
- Same validation rules as creation

## 🎯 Bài tập thực hành

### Level 1: Cơ bản
1. ✅ Implement tất cả CRUD operations
2. ✅ Add validation cho input data
3. ✅ Implement error handling

### Level 2: Trung bình
1. ⭐ Thêm pagination cho GET /todos
2. ⭐ Thêm search functionality
3. ⭐ Thêm bulk operations (delete multiple todos)

### Level 3: Nâng cao
1. ⭐ Thêm file upload cho todos
2. ⭐ Implement caching với memory
3. ⭐ Thêm API documentation với Swagger

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 📚 Học được gì từ dự án này?

1. **Express.js Architecture**: MVC pattern, middleware, routing
2. **File System**: Async operations, JSON handling
3. **Validation**: Input validation với Joi
4. **Error Handling**: Centralized error handling
5. **Testing**: Unit testing với Jest và Supertest
6. **Security**: Basic security practices
7. **API Design**: RESTful API principles

## 🎯 Thời Gian
Tuần 3-4 (sau khi học xong Bài 4: HTTP Server) 