# 🗄️ Bài 8: Database MongoDB

## 🎯 Mục Tiêu
- Cài đặt MongoDB và Mongoose
- Tạo Schema và Models
- CRUD operations với database
- Database relationships

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **MongoDB khác gì với SQL databases (MySQL, PostgreSQL)?**
2. **Mongoose Schema và Model có vai trò gì?**
3. **Tại sao cần validation trong database operations?**

### 🔍 Câu hỏi nâng cao
4. **Database relationships (populate) hoạt động như thế nào?**
5. **Khi nào sử dụng embedded documents vs references?**
6. **Làm thế nào để optimize MongoDB queries cho performance?**

### 🔍 Câu hỏi thực hành
7. **Tạo complete user management system với MongoDB?**
8. **Implement complex queries với aggregation pipeline?**
9. **Làm thế nào để handle database migrations và seeding?**

## 📖 Kiến Thức Cơ Bản

### Setup
```bash
npm install mongoose
```

### Connection
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp');
```

### Schema và Model
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

### CRUD Operations
```javascript
// Create
const user = new User({ name: 'John', email: 'john@example.com' });
await user.save();

// Read
const users = await User.find();
const user = await User.findById(id);

// Update
await User.findByIdAndUpdate(id, { name: 'Jane' });

// Delete
await User.findByIdAndDelete(id);
```

---
⏰ **Thời gian**: 4-5 ngày | 🎯 **Mức độ**: Trung bình-Nâng cao 