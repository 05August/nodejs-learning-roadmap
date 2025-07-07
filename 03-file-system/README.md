# 📁 Bài 3: File System

## 🎯 Mục Tiêu
- Đọc/ghi file synchronous và asynchronous
- Làm việc với directories
- Hiểu về Streams và Buffers
- Xử lý lỗi file operations

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **Sự khác biệt giữa `fs.readFile()` và `fs.readFileSync()` là gì?**
2. **Khi nào nên sử dụng synchronous vs asynchronous file operations?**
3. **Tại sao Streams được ưu tiên hơn khi xử lý file lớn?**

### 🔍 Câu hỏi nâng cao
4. **Event Loop hoạt động như thế nào khi có file operation async?**
5. **Buffers là gì và khi nào cần sử dụng?**
6. **Làm thế nào để xử lý lỗi hiệu quả trong file operations?**

### 🔍 Câu hỏi thực hành
7. **Cách tạo một file backup system với error handling?**
8. **Làm thế nào để copy file lớn mà không bị memory overflow?**
9. **Implement một file watcher để monitor thay đổi trong directory?**

## 📖 Kiến Thức Cơ Bản

### File Operations
```javascript
const fs = require('fs');

// Synchronous (blocking)
const data = fs.readFileSync('file.txt', 'utf8');
fs.writeFileSync('output.txt', 'Hello World');

// Asynchronous (non-blocking)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promises
const fsPromises = require('fs').promises;
const data = await fsPromises.readFile('file.txt', 'utf8');
```

### Directory Operations
```javascript
fs.mkdirSync('new-folder');
fs.readdirSync('folder');
fs.existsSync('file.txt');
fs.statSync('file.txt');
```

### Streams
```javascript
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
```

## 💻 Ví Dụ Thực Tế

### 1. File Reader/Writer
### 2. Directory Scanner
### 3. File Copy Tool

## 🚀 Bài Tập

### Bài 1: File Manager
### Bài 2: Log System
### Bài 3: File Watcher

## 📚 Tài Liệu
- [Node.js File System](https://nodejs.org/api/fs.html)

---
⏰ **Thời gian**: 2-3 ngày | �� **Mức độ**: Cơ bản 