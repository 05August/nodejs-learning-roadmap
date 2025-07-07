# 🐳 Bài 14: Docker & Containerization

## 🎯 Mục tiêu học
- Hiểu về containerization và Docker
- Tạo Dockerfile cho Node.js apps
- Docker Compose cho multi-service
- Container orchestration cơ bản
- Best practices cho production
- CI/CD với Docker

## ❓ Câu Hỏi Trọng Tâm

Sau khi học xong bài này, bạn phải trả lời được:

🔍 **Câu hỏi cơ bản:**
- Container khác gì với Virtual Machine?
- Docker giải quyết vấn đề gì trong development?
- Dockerfile và Docker Image khác nhau như thế nào?

🔍 **Câu hỏi nâng cao:**
- Multi-stage builds có lợi ích gì?
- Docker Compose phù hợp cho trường hợp nào?
- Làm thế nào để optimize Docker images?

🔍 **Câu hỏi thực hành:**
- Cách containerize một Node.js application?
- Làm thế nào để manage persistent data trong containers?
- Best practices cho production deployment với Docker?

## 📚 Nội dung chính

### 1. Giới thiệu Docker
- Container vs Virtual Machine
- Docker architecture (Client, Daemon, Registry)
- Images và Containers
- Docker Hub và registries
- Benefits của containerization

### 2. Docker Basics
- Cài đặt Docker Desktop
- Docker commands cơ bản
- Working with images
- Container lifecycle
- Volumes và networking

### 3. Dockerfile cho Node.js
- Multi-stage builds
- Layer optimization
- Security best practices
- Environment variables
- Health checks

### 4. Docker Compose
- YAML configuration
- Service definitions
- Networking between services
- Volume management
- Environment files

### 5. Production Deployment
- Container registries
- Orchestration với Kubernetes (basic)
- Monitoring và logging
- Security considerations
- Performance optimization

## 🛠️ Thực hành

### Cài đặt Docker
```bash
# Windows: Download Docker Desktop
# https://www.docker.com/products/docker-desktop

# Verify installation
docker --version
docker-compose --version
```

### Basic Dockerfile
```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start command
CMD ["node", "src/app.js"]
```

### Multi-stage Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/app.js"]
```

### Docker Compose Setup
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

### Docker Commands
```bash
# Build image
docker build -t my-node-app .

# Run container
docker run -d -p 3000:3000 --name my-app my-node-app

# View logs
docker logs my-app

# Execute commands in container
docker exec -it my-app sh

# Docker Compose
docker-compose up -d
docker-compose logs -f
docker-compose down
```

## 📋 Bài tập thực hành

### Bài tập 1: Dockerize Todo API
- Tạo Dockerfile cho Todo API project
- Multi-stage build optimization
- Add health checks
- Test local deployment

### Bài tập 2: Full Stack với Docker Compose
- Containerize Blog API + PostgreSQL
- Add Redis for caching
- Nginx reverse proxy
- Environment configuration

### Bài tập 3: E-commerce với Microservices
- Split E-commerce thành services
- Docker Compose orchestration
- Service communication
- Load balancing

### Bài tập 4: Production Setup
- Production-ready Dockerfile
- Security hardening
- Monitoring với Prometheus
- CI/CD pipeline setup

## 🔧 Best Practices

### Dockerfile Optimization
```dockerfile
# Use specific versions
FROM node:18.17.0-alpine

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source after dependencies
COPY . .

# Use non-root user
USER node

# Minimize layers
RUN apk add --no-cache curl && \
    npm cache clean --force
```

### Security Best Practices
```dockerfile
# Scan for vulnerabilities
RUN npm audit --audit-level high

# Remove unnecessary packages
RUN apk del .build-deps

# Set resource limits
LABEL maintainer="your-email@example.com"
LABEL version="1.0.0"

# Use secrets for sensitive data
# Don't use COPY for secrets
```

## 📊 Monitoring và Logging
```yaml
# Docker Compose with monitoring
version: '3.8'

services:
  app:
    # ... app config
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
```

## 🚀 Production Deployment

### Container Registry
```bash
# Tag for registry
docker tag my-app:latest registry.com/my-app:v1.0.0

# Push to registry
docker push registry.com/my-app:v1.0.0

# Pull and deploy
docker pull registry.com/my-app:v1.0.0
docker run -d registry.com/my-app:v1.0.0
```

### Basic Kubernetes (optional)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-node-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-node-app
  template:
    metadata:
      labels:
        app: my-node-app
    spec:
      containers:
      - name: app
        image: my-node-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
```

## 🎯 Dự án thực hành
**Containerized Task Management System**
- Frontend (React) container
- Backend (Node.js) container
- PostgreSQL database
- Redis caching
- Nginx load balancer
- Full Docker Compose setup

## 📖 Tài liệu tham khảo
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Docker Security](https://docs.docker.com/engine/security/)

## 🔗 Liên kết với bài khác
- **Trước đó**: Bài 13 - SQL Databases
- **Dự án**: All projects containerized
- **Deployment**: Bài 12 - Production deployment 