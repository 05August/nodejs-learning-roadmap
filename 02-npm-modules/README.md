# 📦 Bài 2: NPM và Modules

## 🎯 Mục tiêu học
- Hiểu NPM package manager và cách sử dụng
- Nắm vững Module system trong Node.js
- Phân biệt CommonJS và ES6 Modules
- Tạo và xuất bản packages riêng
- Quản lý dependencies hiệu quả

## ❓ Câu Hỏi Trọng Tâm

Sau khi học xong bài này, bạn phải trả lời được:

🔍 **Câu hỏi cơ bản:**
- NPM là gì và tại sao quan trọng?
- Module trong Node.js hoạt động như thế nào?
- CommonJS khác gì với ES6 Modules?

🔍 **Câu hỏi nâng cao:**
- `require()` và `import` khác nhau ở điểm nào?
- Semantic versioning (semver) hoạt động ra sao?
- Package-lock.json có tác dụng gì?

🔍 **Câu hỏi thực hành:**
- Cách tạo và export một module riêng?
- Làm thế nào để quản lý multiple versions của packages?
- Khi nào nên sử dụng devDependencies vs dependencies?

## 📚 Nội dung chính

### 1. NPM (Node Package Manager)
- Package management trong Node.js
- npm registry và package installation
- package.json và package-lock.json
- npm scripts và lifecycle hooks
- Global vs local packages

### 2. Module System
- Khái niệm module trong Node.js
- CommonJS module format
- ES6 Modules (ESM)
- Module resolution algorithm
- Circular dependencies

### 3. Creating Modules
- Tạo và export modules
- Module patterns
- Private và public APIs
- Module best practices
- Testing modules

## 🛠️ Thực hành

### NPM Commands
```bash
# Khởi tạo package.json
npm init -y

# Cài đặt packages
npm install express
npm install --save-dev nodemon
npm install -g npm-check-updates

# Quản lý packages
npm list
npm outdated
npm update
npm uninstall package-name
```

### CommonJS Examples
```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};

// app.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
```

### ES6 Modules Examples
```javascript
// math.mjs
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export default function multiply(a, b) {
  return a * b;
}

// app.mjs
import multiply, { add, subtract } from './math.mjs';
console.log(add(5, 3)); // 8
```

## 📋 Bài tập thực hành

### Bài tập 1: String Utilities Module
- Tạo module với các utility functions cho string
- Export các functions: capitalize, reverse, isPalindrome
- Viết tests để kiểm tra functions

### Bài tập 2: Package.json Management
- Tạo project với multiple dependencies
- Cấu hình npm scripts cho development
- Thiết lập eslint và prettier

### Bài tập 3: Calculator Package
- Tạo calculator package hoàn chỉnh
- Publish lên npm (hoặc local registry)
- Sử dụng trong project khác

## 🔗 Liên kết với bài khác
- **Tiếp theo**: Bài 3 - File System
- **Liên quan**: Bài 1 - Node.js Basics 