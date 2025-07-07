# 📦 Bài 2: NPM và Modules

## 🎯 Mục Tiêu
- Hiểu NPM package manager
- Sử dụng CommonJS và ES6 modules
- Tạo và publish module riêng
- Quản lý dependencies

## 📖 Kiến Thức Cơ Bản

### NPM (Node Package Manager)
```bash
npm init -y                    # Tạo package.json
npm install <package>          # Cài package
npm install -g <package>       # Cài global
npm install --save-dev <pkg>   # Cài dev dependency
npm uninstall <package>        # Gỡ package
npm list                       # Liệt kê packages
npm outdated                   # Kiểm tra package cũ
npm update                     # Cập nhật packages
```

### CommonJS Modules
```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
module.exports = { add, subtract };

// main.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
```

### ES6 Modules (cần "type": "module" trong package.json)
```javascript
// math.mjs
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default { add, subtract };

// main.mjs
import { add, subtract } from './math.mjs';
import math from './math.mjs';
```

## 💻 Ví Dụ Thực Tế

### 1. Tạo Module Calculator
### 2. Sử dụng External Packages
### 3. Quản lý Dependencies

## 🚀 Bài Tập

### Bài 1: Tạo Math Module
### Bài 2: Package Manager Practice
### Bài 3: Module System Comparison

## 📚 Tài Liệu
- [NPM Documentation](https://docs.npmjs.com/)
- [Node.js Modules](https://nodejs.org/api/modules.html)

---
⏰ **Thời gian**: 2-3 ngày | �� **Mức độ**: Cơ bản 