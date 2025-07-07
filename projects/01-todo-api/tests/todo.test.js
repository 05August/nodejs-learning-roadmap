// tests/todo.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Todo API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
    });
  });

  describe('GET /api/v1/todos', () => {
    it('should return all todos', async () => {
      const response = await request(app).get('/api/v1/todos');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/v1/todos', () => {
    it('should create a new todo', async () => {
      const newTodo = {
        title: 'Test Todo',
        description: 'This is a test todo',
        priority: 'high'
      };

      const response = await request(app)
        .post('/api/v1/todos')
        .send(newTodo);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(newTodo.title);
      expect(response.body.data.id).toBeDefined();
    });

    it('should return 400 for invalid todo data', async () => {
      const invalidTodo = {
        // Missing required title
        description: 'This todo has no title'
      };

      const response = await request(app)
        .post('/api/v1/todos')
        .send(invalidTodo);

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/v1/todos/stats', () => {
    it('should return todo statistics', async () => {
      const response = await request(app).get('/api/v1/todos/stats');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.total).toBeDefined();
      expect(response.body.data.completed).toBeDefined();
      expect(response.body.data.pending).toBeDefined();
    });
  });
}); 