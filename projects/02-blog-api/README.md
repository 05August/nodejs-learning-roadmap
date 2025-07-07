# 📝 Blog API

Dự án thứ hai trong roadmap học Node.js. Một Blog API hoàn chỉnh với MongoDB, JWT authentication, và các tính năng nâng cao.

## 🎯 Mục tiêu dự án

- Học cách tích hợp MongoDB với Mongoose
- Thực hành JWT authentication và authorization
- Hiểu về relationships trong NoSQL database
- Áp dụng advanced middleware patterns
- Làm việc với file uploads và image handling

## 📚 Kiến thức cần có

- Node.js basics (Bài 1-5)
- Middleware (Bài 6)
- Routing (Bài 7)
- Database MongoDB (Bài 8)
- Authentication (Bài 9)

## 🚀 Tính năng

- ✅ JWT Authentication & Authorization
- ✅ User registration và login
- ✅ Password hashing với bcrypt
- ✅ Protected routes với middleware
- ✅ Role-based access control
- ✅ MongoDB integration với Mongoose
- ✅ Advanced schema design
- ✅ File upload với Multer
- ✅ Error handling middleware
- ✅ Input validation với Joi

## 📁 Cấu trúc dự án

```
02-blog-api/
├── src/
│   ├── controllers/     # Business logic
│   │   └── authController.js
│   ├── routes/         # API routes
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── userRoutes.js
│   │   └── categoryRoutes.js
│   ├── models/         # Mongoose models
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Category.js
│   ├── middleware/     # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── config/         # Configuration
│   │   └── config.js
│   ├── utils/          # Utility functions
│   └── app.js          # Main app file
├── tests/              # Test files
├── uploads/            # File uploads
├── package.json
├── .gitignore
└── README.md
```

## 🛠️ Hướng dẫn setup

### 1. Cài đặt dependencies
```bash
cd projects/02-blog-api
npm install
```

### 2. Tạo file environment
```bash
# Tạo file .env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/blog-api
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

### 3. Chạy MongoDB
```bash
# Nếu cài local
mongod

# Hoặc sử dụng Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Chạy project
```bash
# Development server
npm run dev

# Production server
npm start

# Chạy tests
npm test

# Seed database
npm run seed
```

## 📖 API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

### Authentication Endpoints

**Register**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Software Developer"
}
```

**Login**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Profile**
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

### Posts Endpoints

**Get All Posts**
```http
GET /api/v1/posts
Authorization: Bearer <token> (optional)
```

**Create Post**
```http
POST /api/v1/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first post...",
  "categories": ["category_id"],
  "tags": ["nodejs", "express"],
  "status": "published"
}
```

## 🔧 Mongoose Models

### User Model
- name, email, password (hashed)
- role (user/admin)
- avatar, bio, isActive
- JWT token generation methods
- Password comparison methods

### Post Model
- title, slug, content, excerpt
- author (ref to User)
- categories (ref to Category)
- tags, status (draft/published)
- likes, comments (embedded)
- Auto-generated: slug, readTime, publishedAt

### Category Model
- name, slug, description
- color, icon, parent (hierarchical)
- Virtual populate for posts count

## 🧪 Testing

Sử dụng Jest và Supertest:
```bash
npm test
```

## 🔐 Security Features

- JWT authentication
- Password hashing với bcrypt
- Input validation với Joi
- Rate limiting
- CORS protection
- Helmet security headers
- Role-based authorization

## 🎯 Bài tập thực hành

### Level 1: Cơ bản
1. ✅ Implement authentication system
2. ✅ Create User và Post models
3. ✅ Protected routes với middleware

### Level 2: Trung bình
1. ⭐ Implement full CRUD cho Posts
2. ⭐ Add Categories và Tags system
3. ⭐ Like và Comment functionality

### Level 3: Nâng cao
1. ⭐ File upload cho featured images
2. ⭐ Advanced search và filtering
3. ⭐ Email notifications
4. ⭐ Social media integration

## 📚 Học được gì từ dự án này?

1. **MongoDB & Mongoose**: Schema design, relationships, indexing
2. **JWT Authentication**: Token-based auth, middleware patterns
3. **Security**: Password hashing, input validation, authorization
4. **Advanced Express**: Middleware chains, error handling
5. **File Handling**: Multer, image processing
6. **Database Design**: NoSQL patterns, virtual populate
7. **API Design**: RESTful principles, status codes

## 🎯 Thời Gian
Tuần 7-8 (sau khi học xong Bài 8: Database MongoDB) 