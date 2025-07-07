# 🛡️ Bài 6: Middleware

## 🎯 Mục Tiêu
- Hiểu Middleware pattern
- Tạo custom middleware
- Sử dụng built-in middleware
- Error handling middleware

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **Middleware pattern là gì và tại sao nó quan trọng?**
2. **Sự khác biệt giữa `app.use()` và `app.get()` khi sử dụng middleware?**
3. **Tại sao phải gọi `next()` trong middleware function?**

### 🔍 Câu hỏi nâng cao
4. **Middleware execution order hoạt động như thế nào?**
5. **Làm thế nào để handle errors trong middleware chain?**
6. **Khi nào sử dụng route-specific middleware vs global middleware?**

### 🔍 Câu hỏi thực hành
7. **Tạo authentication middleware để protect routes?**
8. **Implement rate limiting middleware để prevent abuse?**
9. **Làm thế nào để create logging middleware track all requests?**

## 📖 Kiến Thức Cơ Bản

### Middleware Function
```javascript
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Quan trọng!
};

app.use(logger);
```

### Built-in Middleware
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
```

### Error Handling
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

### Route-specific Middleware
```javascript
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'No token' });
  next();
};

app.get('/protected', auth, (req, res) => {
  res.json({ message: 'Protected route' });
});
```

## 💻 Ví Dụ & Bài Tập

### 1. Logging Middleware
### 2. Authentication Middleware
### 3. Rate Limiting

---
⏰ **Thời gian**: 3-4 ngày | 🎯 **Mức độ**: Trung bình 