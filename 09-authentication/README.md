# 🔐 Bài 9: Authentication

## 🎯 Mục Tiêu
- JWT (JSON Web Tokens)
- Password hashing với bcrypt
- Login/Register system
- Protected routes

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **Tại sao không được lưu plain text password trong database?**
2. **JWT Token hoạt động như thế nào và có gì bên trong?**
3. **Sự khác biệt giữa Authentication và Authorization?**

### 🔍 Câu hỏi nâng cao
4. **Bcrypt salt rounds có ý nghĩa gì và nên chọn số nào?**
5. **JWT có nhược điểm gì và làm thế nào để mitigate?**
6. **Cách implement refresh token để improve security?**

### 🔍 Câu hỏi thực hành
7. **Tạo complete login/register system với validation?**
8. **Implement role-based access control (RBAC)?**
9. **Làm thế nào để handle password reset securely?**

## 📖 Kiến Thức Cơ Bản

### Setup
```bash
npm install bcryptjs jsonwebtoken
```

### Password Hashing
```javascript
const bcrypt = require('bcryptjs');

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Compare password
const isValid = await bcrypt.compare(password, hashedPassword);
```

### JWT
```javascript
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign({ userId }, 'secret', { expiresIn: '1h' });

// Verify token
const decoded = jwt.verify(token, 'secret');
```

### Auth Middleware
```javascript
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

---
⏰ **Thời gian**: 3-4 ngày | 🎯 **Mức độ**: Nâng cao 