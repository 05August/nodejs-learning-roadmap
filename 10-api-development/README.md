# 🔗 Bài 10: API Development

## 🎯 Mục Tiêu
- RESTful API design principles
- API versioning
- Data validation với Joi
- Error handling và status codes
- API documentation

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **RESTful API principles là gì và tại sao quan trọng?**
2. **HTTP methods nào phù hợp cho từng loại operation?**
3. **Tại sao cần validate input data từ client?**

### 🔍 Câu hỏi nâng cao
4. **API versioning strategies nào tốt nhất và khi nào sử dụng?**
5. **Làm thế nào để design proper error responses?**
6. **Cách implement pagination và filtering hiệu quả?**

### 🔍 Câu hỏi thực hành
7. **Tạo comprehensive API documentation với examples?**
8. **Implement API rate limiting và usage monitoring?**
9. **Làm thế nào để handle file uploads trong RESTful API?**

## 📖 Kiến Thức Cơ Bản

### RESTful Design
```
GET    /api/v1/users      - Get all users
GET    /api/v1/users/:id  - Get user by ID
POST   /api/v1/users      - Create user
PUT    /api/v1/users/:id  - Update user
DELETE /api/v1/users/:id  - Delete user
```

### Validation
```bash
npm install joi
```

```javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(100)
});

const { error, value } = userSchema.validate(req.body);
```

### Error Handling
```javascript
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
```

---
⏰ **Thời gian**: 4-5 ngày | 🎯 **Mức độ**: Nâng cao 