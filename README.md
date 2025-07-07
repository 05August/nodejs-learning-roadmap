# 🚀 Node.js Learning Roadmap
*Lộ trình học Node.js từ cơ bản đến nâng cao với các dự án thực hành*

> 📚 **[Đọc Hướng Dẫn Học Tập](LEARNING-GUIDE.md)** để hiểu cách sử dụng câu hỏi trọng tâm hiệu quả!

## 📋 Tổng Quan

Đây là một roadmap học Node.js toàn diện, được thiết kế để đưa bạn từ người mới bắt đầu đến một Node.js developer có kinh nghiệm. Roadmap bao gồm **14 bài học** và **4 dự án thực hành**, với thời gian hoàn thành dự kiến **14 tuần**.

### ✨ Điểm nổi bật của roadmap:
- 📚 **14 bài học** từ cơ bản đến nâng cao
- 🎯 **Câu hỏi trọng tâm** cho mỗi bài học để kiểm tra hiểu biết
- 🛠️ **4 dự án thực hành** với base code production-ready
- 🐳 **Docker support** cho tất cả dự án
- 📊 **SQL & NoSQL** databases
- 🔧 **Testing & Deployment** best practices

### 🎯 Phương pháp học tập

Mỗi bài học được thiết kế với cấu trúc:
1. **Mục tiêu học tập** - Những gì bạn sẽ đạt được
2. **❓ Câu hỏi trọng tâm** - Kiểm tra hiểu biết sau mỗi bài
3. **Lý thuyết** - Kiến thức cần nắm vững
4. **Thực hành** - Ví dụ code và bài tập
5. **Dự án** - Áp dụng vào thực tế

> 💡 **Lưu ý**: Hãy trả lời được tất cả **câu hỏi trọng tâm** trước khi chuyển sang bài tiếp theo!

## 📋 Mục Lục
- [Giới Thiệu](#giới-thiệu)
- [Yêu Cầu Tiên Quyết](#yêu-cầu-tiên-quyết)
- [Cài Đặt Môi Trường](#cài-đặt-môi-trường)
- [Roadmap Chi Tiết](#roadmap-chi-tiết)
- [Các Dự Án Thực Hành](#các-dự-án-thực-hành)
- [Tài Liệu Tham Khảo](#tài-liệu-tham-khảo)

## 🌟 Giới Thiệu

Đây là một roadmap học Node.js được thiết kế để đưa bạn từ người mới bắt đầu đến có thể phát triển các ứng dụng backend hoàn chỉnh. Mỗi bài học đều có:
- Lý thuyết cơ bản
- Ví dụ thực tế
- Bài tập thực hành
- Dự án mini

## 🔧 Yêu Cầu Tiên Quyết

### Kiến Thức Cần Có:
- ✅ JavaScript cơ bản (Variables, Functions, Objects, Arrays)
- ✅ ES6+ (Arrow Functions, Destructuring, Promises, async/await)
- ✅ HTML/CSS cơ bản
- ✅ Hiểu biết cơ bản về HTTP

### Công Cụ Cần Thiết:
- 📝 IDE: VS Code (khuyến nghị)
- 🌐 Browser: Chrome/Firefox
- 📱 API Testing: Postman hoặc Insomnia

## 🛠️ Cài Đặt Môi Trường

### 1. Cài Đặt Node.js
```bash
# Tải Node.js từ https://nodejs.org/
# Khuyến nghị version LTS (Long Term Support)

# Kiểm tra version
node --version
npm --version
```

### 2. Cài Đặt Công Cụ Hỗ Trợ
```bash
# Cài đặt nodemon (tự động restart server khi có thay đổi)
npm install -g nodemon

# Cài đặt npm-check-updates (cập nhật dependencies)
npm install -g npm-check-updates
```

### 3. Thiết Lập VS Code
```bash
# Extensions cần thiết:
# - Node.js Extension Pack
# - ESLint
# - Prettier
# - REST Client
# - Thunder Client
```

## 📚 Roadmap Chi Tiết

### 🎯 Tuần 1-2: Nền Tảng Cơ Bản

#### **Bài 1: Node.js Basics** (3-4 ngày)
- **Thư mục**: `01-nodejs-basics/`
- **Nội dung**:
  - Node.js là gì và tại sao sử dụng?
  - V8 Engine và Event Loop
  - Global Objects và Process
  - Callback Pattern
- **Bài tập**: Tạo ứng dụng console đơn giản

#### **Bài 2: NPM và Modules** (2-3 ngày)
- **Thư mục**: `02-npm-and-modules/`
- **Nội dung**:
  - NPM package manager
  - CommonJS vs ES6 Modules
  - Tạo và export modules
  - Package.json và dependencies
- **Bài tập**: Tạo module calculator riêng

#### **Bài 3: File System** (2-3 ngày)
- **Thư mục**: `03-file-system/`
- **Nội dung**:
  - fs module (sync vs async)
  - Đọc/ghi file
  - Làm việc với directories
  - Streams và Buffers
- **Bài tập**: Ứng dụng quản lý file

### 🎯 Tuần 3-4: HTTP và Web Server

#### **Bài 4: HTTP Server** (3-4 ngày)
- **Thư mục**: `04-http-server/`
- **Nội dung**:
  - HTTP module
  - Tạo server cơ bản
  - Request và Response objects
  - Routing đơn giản
- **Bài tập**: Tạo REST API đơn giản

#### **Bài 5: Express.js Basics** (3-4 ngày)
- **Thư mục**: `05-express-basics/`
- **Nội dung**:
  - Giới thiệu Express.js
  - Setup Express app
  - Routes và HTTP methods
  - Request/Response handling
- **Bài tập**: Tạo API CRUD cơ bản

### 🎯 Tuần 5-6: Express Nâng Cao

#### **Bài 6: Middleware** (3-4 ngày)
- **Thư mục**: `06-middleware/`
- **Nội dung**:
  - Middleware pattern
  - Built-in middleware
  - Custom middleware
  - Error handling middleware
- **Bài tập**: Tạo middleware authentication

#### **Bài 7: Routing** (2-3 ngày)
- **Thư mục**: `07-routing/`
- **Nội dung**:
  - Express Router
  - Route parameters
  - Query strings
  - Route grouping
- **Bài tập**: Tạo API với routing phức tạp

### 🎯 Tuần 7-8: Database và Authentication

#### **Bài 8: Database MongoDB** (4-5 ngày)
- **Thư mục**: `08-database-mongodb/`
- **Nội dung**:
  - MongoDB basics
  - Mongoose ODM
  - Schema và Models
  - Database operations
- **Bài tập**: Tạo API với MongoDB

#### **Bài 9: Authentication** (3-4 ngày)
- **Thư mục**: `09-authentication/`
- **Nội dung**:
  - JWT (JSON Web Tokens)
  - Password hashing (bcrypt)
  - Sessions và Cookies
  - OAuth 2.0 basics
- **Bài tập**: Hệ thống đăng nhập/đăng ký

### 🎯 Tuần 9-10: API Development và Testing

#### **Bài 10: API Development** (4-5 ngày)
- **Thư mục**: `10-api-development/`
- **Nội dung**:
  - RESTful API design
  - API versioning
  - Data validation
  - File uploads
- **Bài tập**: Tạo API hoàn chỉnh

#### **Bài 11: Testing** (3-4 ngày)
- **Thư mục**: `11-testing/`
- **Nội dung**:
  - Unit testing với Jest
  - Integration testing
  - API testing với Supertest
  - Test coverage
- **Bài tập**: Viết test cho API

### 🎯 Tuần 11-12: Deployment và Production

#### **Bài 12: Deployment** (3-4 ngày)
- **Thư mục**: `12-deployment/`
- **Nội dung**:
  - Production best practices
  - Environment variables
  - Process managers (PM2)
  - Deployment platforms (Heroku, Vercel)
- **Bài tập**: Deploy ứng dụng lên production

### 🎯 Tuần 13: SQL Database

#### **Bài 13: SQL Databases** (4-5 ngày)
- **Thư mục**: `13-sql-databases/`
- **Nội dung**:
  - PostgreSQL và MySQL
  - Sequelize ORM
  - Database migrations
  - Query optimization
- **Bài tập**: Tạo API với PostgreSQL

### 🎯 Tuần 14: Containerization

#### **Bài 14: Docker & Containerization** (3-4 ngày)
- **Thư mục**: `14-docker-containerization/`
- **Nội dung**:
  - Docker basics
  - Dockerfile cho Node.js
  - Docker Compose
  - Container orchestration
- **Bài tập**: Containerize tất cả dự án

## 🎨 Các Dự Án Thực Hành

### **Dự Án 1: Todo API** (Tuần 3-4)
- **Thư mục**: `projects/01-todo-api/`
- **Mô tả**: API quản lý công việc với CRUD operations
- **Công nghệ**: Node.js, Express, File System
- **Docker**: ✅ Đã có Dockerfile và Docker Compose

### **Dự Án 2: Blog API** (Tuần 7-8)
- **Thư mục**: `projects/02-blog-api/`
- **Mô tả**: API blog với authentication và MongoDB
- **Công nghệ**: Node.js, Express, MongoDB, JWT
- **Docker**: ✅ Đã có Dockerfile và Docker Compose

### **Dự Án 3: E-commerce API** (Tuần 10-12)
- **Thư mục**: `projects/03-ecommerce-api/`
- **Mô tả**: API thương mại điện tử hoàn chỉnh
- **Công nghệ**: Node.js, Express, MongoDB, JWT, Testing
- **Docker**: ✅ Đã có Dockerfile và Docker Compose

### **Dự Án 4: Task Management API** (Tuần 13)
- **Thư mục**: `projects/04-task-management-sql/`
- **Mô tả**: API quản lý nhiệm vụ với PostgreSQL
- **Công nghệ**: Node.js, Express, PostgreSQL, Sequelize
- **Docker**: ✅ Đã có Dockerfile và Docker Compose

## 📖 Tài Liệu Tham Khảo

### Tài Liệu Chính Thức:
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

### Khóa Học Online:
- [Node.js Course - freeCodeCamp](https://www.freecodecamp.org/)
- [The Complete Node.js Developer Course](https://www.udemy.com/)

### Sách Tham Khảo:
- "Node.js in Action" by Manning Publications
- "Learning Node.js" by Shelley Powers

## 🤝 Cách Sử Dụng Roadmap

1. **Bắt đầu từ bài 1** và làm theo thứ tự
2. **Hoàn thành bài tập** trước khi chuyển sang bài tiếp theo
3. **Thực hành dự án** để củng cố kiến thức
4. **Đọc thêm tài liệu** để hiểu sâu hơn
5. **Chia sẻ và thảo luận** với cộng đồng

## 📞 Hỗ Trợ

- **Issues**: Tạo issue trên GitHub repository
- **Discussions**: Thảo luận trong phần Discussions
- **Community**: Tham gia các group Node.js Việt Nam

---

**Chúc bạn học tập hiệu quả! 🚀**

**Thời gian hoàn thành dự kiến**: 14 tuần (3.5 tháng)
**Cam kết**: 2-3 tiếng/ngày, 5 ngày/tuần 