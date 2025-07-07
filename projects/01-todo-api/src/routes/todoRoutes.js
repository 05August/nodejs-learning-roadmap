// src/routes/todoRoutes.js
const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// GET /api/v1/todos/stats - Get statistics (must be before /:id route)
router.get('/stats', todoController.getStats);

// GET /api/v1/todos - Get all todos with optional filters
router.get('/', todoController.getAllTodos);

// GET /api/v1/todos/:id - Get specific todo
router.get('/:id', todoController.getTodoById);

// POST /api/v1/todos - Create new todo
router.post('/', todoController.createTodo);

// PUT /api/v1/todos/:id - Update todo
router.put('/:id', todoController.updateTodo);

// DELETE /api/v1/todos/:id - Delete todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router; 