# 📊 Bài 13: SQL Databases với Node.js

## 🎯 Mục tiêu học
- Hiểu về SQL databases và ORM
- Làm việc với PostgreSQL và MySQL
- Sử dụng Sequelize và Prisma
- Database migrations và seeds
- Query optimization và indexing
- Connection pooling và transactions

## ❓ Câu Hỏi Trọng Tâm

Sau khi học xong bài này, bạn phải trả lời được:

🔍 **Câu hỏi cơ bản:**
- SQL khác gì với NoSQL? Khi nào nên sử dụng SQL?
- ORM là gì và tại sao cần sử dụng?
- PostgreSQL khác gì với MySQL?

🔍 **Câu hỏi nâng cao:**
- Database migrations giải quyết vấn đề gì?
- Associations trong Sequelize hoạt động như thế nào?
- Làm thế nào để optimize database queries?

🔍 **Câu hỏi thực hành:**
- Cách thiết kế database schema hiệu quả?
- Khi nào nên sử dụng transactions?
- Làm thế nào để implement connection pooling?

## 📚 Nội dung chính

### 1. Giới thiệu SQL Databases
- SQL vs NoSQL comparison
- Khi nào sử dụng SQL database
- PostgreSQL vs MySQL vs SQLite
- Database design principles
- Normalization và relationships

### 2. PostgreSQL với Node.js
- Cài đặt và cấu hình PostgreSQL
- Kết nối với pg library
- Raw SQL queries
- Connection pooling
- Environment setup

### 3. Sequelize ORM
- Object-Relational Mapping concept
- Models và Associations
- Migrations và Seeders
- Validations và Hooks
- Transactions và Concurrency

### 4. Prisma (Modern ORM)
- Type-safe database access
- Schema-first approach
- Prisma Client generation
- Database introspection
- Performance monitoring

### 5. Database Best Practices
- Query optimization
- Indexing strategies
- Connection management
- Data validation
- Security considerations

## 🛠️ Thực hành

### Setup PostgreSQL
```bash
# Cài đặt PostgreSQL (Windows)
# Download từ https://www.postgresql.org/download/

# Tạo database
createdb nodejs_learning

# Kết nối
psql -d nodejs_learning
```

### Raw SQL với pg
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'nodejs_learning',
  password: 'password',
  port: 5432,
});

// Query example
const getUserById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};
```

### Sequelize Models
```javascript
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

// Associations
User.hasMany(Post);
Post.belongsTo(User);
```

### Prisma Schema
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

## 📋 Bài tập thực hành

### Bài tập 1: Setup Database
- Cài đặt PostgreSQL local
- Tạo database và tables
- Kết nối từ Node.js
- Viết basic CRUD operations

### Bài tập 2: Sequelize Integration
- Setup Sequelize với Express
- Tạo models với associations
- Implement migrations
- Viết seeders để test data

### Bài tập 3: Prisma Implementation
- Convert Sequelize models sang Prisma
- Generate Prisma Client
- Implement type-safe queries
- Compare performance

### Bài tập 4: Advanced Features
- Implement transactions
- Query optimization
- Connection pooling
- Error handling

## 🎯 Dự án thực hành
**Task Management API với PostgreSQL**
- User authentication
- Project và task management
- Team collaboration
- PostgreSQL + Sequelize/Prisma
- Migration system

## 📖 Tài liệu tham khảo
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Sequelize Documentation](https://sequelize.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [pg Library](https://node-postgres.com/)

## 🔗 Liên kết với bài khác
- **Tiếp theo**: Bài 14 - Docker & Containerization
- **Dự án**: 04-task-management-sql
- **Liên quan**: Bài 8 (MongoDB comparison) 