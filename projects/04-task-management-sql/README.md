# 📋 Task Management API với PostgreSQL

## 🎯 Mục đích
Dự án này là một RESTful API để quản lý nhiệm vụ (task management) được xây dựng với Node.js, Express, PostgreSQL và Sequelize ORM. Đây là dự án thực hành cho **Bài 13: SQL Databases**.

## 🚀 Tính năng chính

### 👥 Quản lý người dùng
- Đăng ký/đăng nhập với JWT authentication
- Quản lý thông tin cá nhân
- Phân quyền user/admin

### 📁 Quản lý dự án
- Tạo, sửa, xóa dự án
- Thêm thành viên vào dự án
- Theo dõi tiến độ dự án
- Quản lý vai trò thành viên

### ✅ Quản lý nhiệm vụ
- CRUD operations cho tasks
- Gán nhiệm vụ cho thành viên
- Theo dõi trạng thái task
- Đặt deadline và priority
- Tag system cho tasks

### 🔧 Tính năng kỹ thuật
- PostgreSQL với Sequelize ORM
- JWT authentication
- Input validation với Joi
- Error handling middleware
- API documentation
- Docker containerization

## 📚 Công nghệ sử dụng

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **PostgreSQL**: Relational database
- **Sequelize**: ORM for Node.js
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Joi**: Input validation

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Jest**: Testing framework
- **Supertest**: API testing

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- PostgreSQL >= 12
- Docker & Docker Compose (tùy chọn)

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cài đặt PostgreSQL
```bash
# Windows: Download từ https://www.postgresql.org/download/
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Tạo database
createdb task_management

# Hoặc sử dụng psql
psql -U postgres
CREATE DATABASE task_management;
```

### 3. Cấu hình environment
```bash
# Tạo file .env
cp .env.example .env

# Cập nhật các biến môi trường
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
```

### 4. Chạy migrations
```bash
npm run db:migrate
```

### 5. Chạy seeders (tùy chọn)
```bash
npm run db:seed
```

### 6. Khởi động server
```bash
# Development
npm run dev

# Production
npm start
```

## 🐳 Docker Setup

### 1. Chạy với Docker Compose
```bash
# Khởi động tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### 2. Services được khởi động
- **app**: Node.js API (port 3000)
- **db**: PostgreSQL (port 5432)
- **redis**: Redis cache (port 6379)
- **adminer**: Database management UI (port 8080)
- **nginx**: Reverse proxy (port 80)

## 📖 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # Đăng ký user mới
POST /api/auth/login       # Đăng nhập
POST /api/auth/refresh     # Refresh JWT token
POST /api/auth/logout      # Đăng xuất
```

### User Endpoints
```
GET    /api/users          # Lấy danh sách users
GET    /api/users/:id      # Lấy thông tin user
PUT    /api/users/:id      # Cập nhật thông tin user
DELETE /api/users/:id      # Xóa user
```

### Project Endpoints
```
GET    /api/projects       # Lấy danh sách projects
POST   /api/projects       # Tạo project mới
GET    /api/projects/:id   # Lấy chi tiết project
PUT    /api/projects/:id   # Cập nhật project
DELETE /api/projects/:id   # Xóa project

POST   /api/projects/:id/members      # Thêm thành viên
DELETE /api/projects/:id/members/:userId  # Xóa thành viên
```

### Task Endpoints
```
GET    /api/tasks          # Lấy danh sách tasks
POST   /api/tasks          # Tạo task mới
GET    /api/tasks/:id      # Lấy chi tiết task
PUT    /api/tasks/:id      # Cập nhật task
DELETE /api/tasks/:id      # Xóa task

GET    /api/tasks?project=:projectId  # Lọc tasks theo project
GET    /api/tasks?status=:status      # Lọc tasks theo status
GET    /api/tasks?assignee=:userId    # Lọc tasks theo assignee
```

## 🗃️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  avatar VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  role VARCHAR(10) DEFAULT 'user',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'planning',
  priority VARCHAR(10) DEFAULT 'medium',
  start_date DATE,
  end_date DATE,
  color VARCHAR(7),
  is_archived BOOLEAN DEFAULT FALSE,
  owner_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'todo',
  priority VARCHAR(10) DEFAULT 'medium',
  due_date TIMESTAMP,
  completed_at TIMESTAMP,
  estimated_hours INTEGER,
  actual_hours INTEGER,
  tags JSON,
  project_id INTEGER REFERENCES projects(id),
  assigned_to INTEGER REFERENCES users(id),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Project Members Table
```sql
CREATE TABLE project_members (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  user_id INTEGER REFERENCES users(id),
  role VARCHAR(10) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, user_id)
);
```

## 🧪 Testing

### Chạy tests
```bash
# Chạy tất cả tests
npm test

# Chạy tests với watch mode
npm run test:watch

# Chạy tests với coverage
npm run test:coverage
```

### Test structure
```
tests/
├── setup.js          # Test setup
├── auth.test.js       # Authentication tests
├── users.test.js      # User API tests
├── projects.test.js   # Project API tests
└── tasks.test.js      # Task API tests
```

## 📊 Performance & Monitoring

### Database Indexing
```sql
-- Indexes for better performance
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assignee ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_project_members_project ON project_members(project_id);
CREATE INDEX idx_project_members_user ON project_members(user_id);
```

### Monitoring endpoints
```
GET /health           # Health check
GET /metrics          # Application metrics
```

## 🔒 Security Features

### Authentication & Authorization
- JWT tokens với expiration
- Password hashing với bcrypt
- Role-based access control
- Protected routes middleware

### Input Validation
- Joi schemas cho tất cả inputs
- SQL injection prevention
- XSS protection với helmet
- Rate limiting

### Security Headers
```javascript
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

## 📋 Scripts có sẵn

```bash
# Development
npm run dev           # Chạy server với nodemon
npm run start         # Chạy server production

# Database
npm run db:migrate    # Chạy migrations
npm run db:seed       # Chạy seeders
npm run db:reset      # Reset database

# Docker
npm run docker:up     # Khởi động Docker containers
npm run docker:down   # Dừng Docker containers
npm run docker:logs   # Xem logs

# Testing
npm run test          # Chạy tests
npm run test:watch    # Chạy tests với watch mode

# Code quality
npm run lint          # Kiểm tra code style
npm run format        # Format code với Prettier
```

## 🚀 Deployment

### Production Setup
1. **Environment Variables**
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/task_management
JWT_SECRET=your-strong-secret-key
```

2. **Build và Deploy**
```bash
# Build Docker image
docker build -t task-management-api .

# Deploy với Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Deployment Platforms
- **Heroku**: Sử dụng Heroku Postgres
- **AWS**: EC2 + RDS PostgreSQL
- **DigitalOcean**: Droplet + Managed Database
- **Railway**: Platform-as-a-Service

## 📚 Học từ dự án này

### Sequelize ORM
- Model definitions và associations
- Migrations và seeders
- Query optimization
- Transactions và hooks

### PostgreSQL
- Relational database design
- Indexing strategies
- Query performance
- Data relationships

### Docker
- Multi-container applications
- Volume management
- Network configuration
- Production deployment

### API Design
- RESTful principles
- Authentication patterns
- Error handling
- Input validation

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 📞 Support

- **Issues**: Tạo issue trên GitHub
- **Documentation**: Xem thêm trong thư mục docs/
- **Community**: Tham gia Node.js Vietnam group

---

**Dự án này là phần của [Node.js Learning Roadmap](../../README.md)**

**Bài học liên quan**: [Bài 13: SQL Databases](../../13-sql-databases/README.md) 