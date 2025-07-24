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
1. NPM là gì và tại sao quan trọng?
- NPM (Node package manager) là một hệ thống quản lý package lớn nhất cho JS. Cho phép dễ dàng cài đặt, quản lý, và chia sẻ các thư viện, công cụ.
- Tiết kiệm thời gian, dễ dàng quản lí dependencies, hỗ trợ phát triển module, cộng đồng lớn, triển khai các script trong các quy trình build deploy.
2. Module trong Node.js hoạt động như thế nào?
- Module trong Node.js hoạt động theo cơ chế module hóa theo từng tệp (file-based). Mỗi tệp .js là một module riêng biệt, có phạm vi riêng (scope), không ảnh hưởng đến biến toàn cục. Module giúp chia nhỏ chương trình thành các phần dễ quản lý, tái sử dụng và bảo trì.
3. CommonJS khác gì với ES6 Modules?
- CommonJS: Cũ, phổ biến trong Node.js truyền thống.
- ES6 Modules: Mới, chuẩn quốc tế, tối ưu cho frontend và tree-shaking.
- Khác nhau cú pháp import và export

🔍 **Câu hỏi nâng cao:**
1. `require()` và `import` khác nhau ở điểm nào?
- require() và import đều dùng để nạp module, nhưng khác nhau ở hệ thống và cách hoạt động. require() thuộc CommonJS, hoạt động đồng bộ, không hỗ trợ hoisting và thường dùng trong Node.js truyền thống. Ngược lại, import là cú pháp của ES6 Modules, hoạt động bất đồng bộ, có hoisting và được hỗ trợ tốt trong cả trình duyệt hiện đại lẫn Node.js mới. require() là một hàm nên có thể dùng linh hoạt trong runtime, trong khi import chỉ dùng được ở cấp độ đầu tệp và hỗ trợ tree-shaking. Ngoài ra, require() dùng với module.exports, còn import đi kèm với export hoặc export default.
2. Semantic versioning (semver) hoạt động ra sao?
- Semantic Versioning (Semver) là một quy tắc đặt phiên bản phần mềm có dạng MAJOR.MINOR.PATCH (ví dụ: 2.5.1), giúp người dùng hiểu rõ mức độ thay đổi của phần mềm.
- MAJOR – Thay đổi lớn, có thể phá vỡ tương thích cũ (breaking changes).
- MINOR – Thêm tính năng mới nhưng không phá vỡ chức năng cũ.
- PATCH – Sửa lỗi hoặc cập nhật nhỏ, không thay đổi API.
3. Package-lock.json có tác dụng gì?
- Đảm bảo cài đặt đồng nhất
- Tăng tốc quá trình cài đặt
- Theo dõi sự thay đổi của dependencies
- Bảo mật

🔍 **Câu hỏi thực hành:**
1. Cách tạo và export một module riêng?
2. Làm thế nào để quản lý multiple versions của packages?
3. Khi nào nên sử dụng devDependencies vs dependencies?
- dependencies khi package đó cần thiết cho ứng dụng chạy ở môi trường production, tức là khi deploy thực tế, ứng dụng vẫn phải dùng các package này.
- devDependencies khi package chỉ dùng trong quá trình phát triển, test, build, không cần thiết khi chạy ứng dụng trên production.
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
