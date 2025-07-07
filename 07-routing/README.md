# 🛣️ Bài 7: Routing

## 🎯 Mục Tiêu
- Express Router
- Route parameters và query strings
- Route grouping và organization
- Route validation

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **Express Router khác gì với route thông thường?**
2. **Sự khác biệt giữa route parameters (:id) và query strings (?page=1)?**
3. **Tại sao nên organize routes vào separate files?**

### 🔍 Câu hỏi nâng cao
4. **Route matching order hoạt động như thế nào trong Express?**
5. **Làm thế nào để implement nested routing hiệu quả?**
6. **Cách handle route parameters validation và error cases?**

### 🔍 Câu hỏi thực hành
7. **Tạo modular routing structure cho large application?**
8. **Implement API versioning thông qua routing?**
9. **Làm thế nào để create dynamic routes với pattern matching?**

## 📖 Kiến Thức Cơ Bản

### Express Router
```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Users route' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

module.exports = router;

// app.js
app.use('/users', userRoutes);
```

### Route Parameters
```javascript
app.get('/users/:id/posts/:postId', (req, res) => {
  const { id, postId } = req.params;
  const { page, limit } = req.query;
  res.json({ userId: id, postId, page, limit });
});
```

---
⏰ **Thời gian**: 2-3 ngày | 🎯 **Mức độ**: Trung bình 