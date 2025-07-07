# 🚀 Bài 12: Deployment

## 🎯 Mục Tiêu
- Production best practices
- Environment variables
- Process managers (PM2)
- Deploy lên Heroku, Vercel, Railway

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **Sự khác biệt giữa development và production environment?**
2. **Tại sao cần sử dụng environment variables?**
3. **Process manager (PM2) giải quyết vấn đề gì?**

### 🔍 Câu hỏi nâng cao
4. **Load balancing và clustering hoạt động như thế nào?**
5. **Làm thế nào để monitor application performance in production?**
6. **Security considerations nào quan trọng khi deploy?**

### 🔍 Câu hỏi thực hành
7. **Deploy Node.js app lên cloud platforms (Heroku, Vercel)?**
8. **Setup CI/CD pipeline cho automated deployment?**
9. **Implement health checks và graceful shutdown?**

## 📖 Kiến Thức Cơ Bản

### Environment Variables
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
```

### PM2 Process Manager
```bash
npm install -g pm2

# Start app
pm2 start app.js --name "my-app"

# Cluster mode
pm2 start app.js -i max

# Monitor
pm2 monit

# Logs
pm2 logs
```

### Heroku Deployment
```bash
# Heroku CLI
heroku create my-app
heroku config:set NODE_ENV=production
git push heroku main
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

### Production Checklist
- [ ] Environment variables
- [ ] Error handling
- [ ] Logging
- [ ] Security headers
- [ ] Rate limiting
- [ ] HTTPS
- [ ] Database backups
- [ ] Monitoring

---
⏰ **Thời gian**: 3-4 ngày | 🎯 **Mức độ**: Nâng cao 