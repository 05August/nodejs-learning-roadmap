# 🧪 Bài 11: Testing

## 🎯 Mục Tiêu
- Unit testing với Jest
- Integration testing
- API testing với Supertest
- Test coverage và CI/CD

## ❓ Câu Hỏi Trọng Tâm

### 🔍 Câu hỏi cơ bản
1. **Sự khác biệt giữa Unit, Integration và End-to-End testing?**
2. **Tại sao testing quan trọng trong software development?**
3. **Test coverage 100% có nghĩa là code perfect không?**

### 🔍 Câu hỏi nâng cao
4. **Làm thế nào để test asynchronous code hiệu quả?**
5. **Mocking và Stubbing có vai trò gì trong testing?**
6. **Cách setup CI/CD pipeline với automated testing?**

### 🔍 Câu hỏi thực hành
7. **Tạo comprehensive test suite cho REST API?**
8. **Test database operations mà không affect production data?**
9. **Implement performance testing để measure API response times?**

## 📖 Kiến Thức Cơ Bản

### Setup
```bash
npm install --save-dev jest supertest
```

### Unit Test
```javascript
// math.test.js
const { add, subtract } = require('./math');

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('subtracts 5 - 3 to equal 2', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
```

### API Testing
```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/users')
      .expect(200);
    
    expect(res.body).toHaveProperty('users');
  });
});
```

### Package.json Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---
⏰ **Thời gian**: 3-4 ngày | 🎯 **Mức độ**: Nâng cao 