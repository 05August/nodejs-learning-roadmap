# 🛒 E-commerce API

Dự án cuối cùng trong roadmap học Node.js. Một hệ thống E-commerce hoàn chỉnh với tất cả các tính năng nâng cao và tích hợp production-ready.

## 🎯 Mục tiêu dự án

- Xây dựng ứng dụng full-scale production
- Tích hợp payment gateway (Stripe)
- Implement caching với Redis
- Email notifications system
- Advanced search và filtering
- Admin dashboard với analytics
- Performance optimization
- Security best practices

## 📚 Kiến thức cần có

- Tất cả kiến thức từ Bài 1-11
- API Development (Bài 10)
- Testing (Bài 11)
- Deployment (Bài 12)

## 🚀 Tính năng hoàn chỉnh

### Core Features
- ✅ JWT Authentication & Authorization
- ✅ User registration/login/profile
- ✅ Product catalog với categories
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ Payment processing (Stripe)
- ✅ Order history và tracking

### Advanced Features
- ✅ Redis caching cho performance
- ✅ Email notifications
- ✅ Product reviews và ratings
- ✅ Advanced search với filters
- ✅ Admin dashboard
- ✅ Inventory management
- ✅ Discount codes và promotions
- ✅ Analytics và reporting

### Technical Features
- ✅ Error handling middleware
- ✅ Input validation với Joi
- ✅ File upload với Multer
- ✅ Image processing với Sharp
- ✅ Rate limiting
- ✅ Security headers
- ✅ API documentation

## 📁 Cấu trúc dự án

```
03-ecommerce-api/
├── src/
│   ├── controllers/     # Business logic
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── adminRoutes.js
│   ├── models/         # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   └── Review.js
│   ├── middleware/     # Custom middleware
│   ├── services/       # External services
│   │   ├── redis.js
│   │   ├── email.js
│   │   └── stripe.js
│   ├── config/         # Configuration
│   ├── utils/          # Utility functions
│   └── app.js          # Main app file
├── tests/              # Test files
├── uploads/            # File uploads
├── package.json
└── README.md
```

## 🛠️ Hướng dẫn setup

### 1. Cài đặt dependencies
```bash
cd projects/03-ecommerce-api
npm install
```

### 2. Tạo file environment
```bash
# Tạo file .env
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce-api

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=E-commerce API <noreply@example.com>

# Frontend
FRONTEND_URL=http://localhost:3000
```

### 3. Chạy services
```bash
# MongoDB
mongod

# Redis
redis-server

# Hoặc dùng Docker
docker-compose up -d
```

### 4. Chạy project
```bash
# Development server
npm run dev

# Production server
npm start

# Chạy tests
npm test

# Seed database
npm run seed
```

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

### Products
```http
GET    /api/v1/products              # Get all products
GET    /api/v1/products/:id          # Get product by ID
GET    /api/v1/products/search/:query # Search products
POST   /api/v1/products              # Create product (admin)
PUT    /api/v1/products/:id          # Update product (admin)
DELETE /api/v1/products/:id          # Delete product (admin)
```

### Shopping Cart
```http
GET    /api/v1/cart                  # Get user cart
POST   /api/v1/cart/add              # Add to cart
PUT    /api/v1/cart/update           # Update cart item
DELETE /api/v1/cart/remove/:productId # Remove from cart
```

### Orders
```http
GET  /api/v1/orders                  # Get user orders
POST /api/v1/orders                  # Create order
GET  /api/v1/orders/:id              # Get order details
PUT  /api/v1/orders/:id/cancel       # Cancel order
```

### Payments
```http
POST /api/v1/payments/create-intent  # Create payment intent
POST /api/v1/payments/webhook        # Stripe webhook
```

### Admin
```http
GET /api/v1/admin/dashboard          # Dashboard stats
GET /api/v1/admin/users              # All users
GET /api/v1/admin/orders             # All orders
```

## 🔧 Core Models

### User Model
- Authentication & profile
- Shipping addresses
- Order history
- Wishlist

### Product Model
- Product information
- Categories & tags
- Inventory tracking
- Images & variants

### Order Model
- Order items
- Shipping information
- Payment status
- Order tracking

### Cart Model
- User cart items
- Quantity management
- Price calculations

## 🎯 Bài tập thực hành

### Level 1: Core E-commerce
1. ⭐ User authentication system
2. ⭐ Product catalog với CRUD
3. ⭐ Shopping cart functionality
4. ⭐ Basic order processing

### Level 2: Advanced Features
1. ⭐ Stripe payment integration
2. ⭐ Email notifications
3. ⭐ Redis caching
4. ⭐ Advanced search & filters
5. ⭐ Admin dashboard

### Level 3: Production Ready
1. ⭐ Performance optimization
2. ⭐ Security hardening
3. ⭐ Comprehensive testing
4. ⭐ Monitoring & logging
5. ⭐ CI/CD pipeline

## 📊 External Services

### Stripe Integration
- Payment processing
- Webhook handling
- Subscription management

### Redis Caching
- Product caching
- Session storage
- Cart persistence

### Email Service
- Order confirmations
- Password reset
- Promotional emails

## 📚 Học được gì từ dự án này?

1. **Full-Stack Development**: End-to-end e-commerce solution
2. **Payment Integration**: Stripe API, webhooks, security
3. **Caching Strategy**: Redis implementation patterns
4. **Email Systems**: Transactional emails, templates
5. **Performance**: Optimization techniques, monitoring
6. **Security**: Production-level security practices
7. **Testing**: Comprehensive test coverage
8. **DevOps**: Deployment, CI/CD, monitoring

## 🎯 Thời Gian
Tuần 10-12 (sau khi học xong Bài 10-11: API + Testing) 