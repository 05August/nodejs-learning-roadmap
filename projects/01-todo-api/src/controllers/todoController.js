const Joi = require('joi');
const todoModel = require('../models/todoModel');

// Validation schemas
const createTodoSchema = Joi.object({
  title: Joi.string().required().min(1).max(100),
  description: Joi.string().allow('').max(500),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  dueDate: Joi.date().iso().allow(null)
});

const updateTodoSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string().allow('').max(500),
  completed: Joi.boolean(),
  priority: Joi.string().valid('low', 'medium', 'high'),
  dueDate: Joi.date().iso().allow(null)
});

class TodoController {
  // GET /api/v1/todos
  async getAllTodos(req, res, next) {
    try {
      const { completed, priority, sortBy, order } = req.query;
      let todos = await todoModel.getAllTodos();

      // Filter by completed status
      if (completed !== undefined) {
        const isCompleted = completed === 'true';
        todos = todos.filter(todo => todo.completed === isCompleted);
      }

      // Filter by priority
      if (priority) {
        todos = todos.filter(todo => todo.priority === priority);
      }

      // Sort todos
      if (sortBy) {
        const sortOrder = order === 'desc' ? -1 : 1;
        todos.sort((a, b) => {
          if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
            return (new Date(a[sortBy]) - new Date(b[sortBy])) * sortOrder;
          }
          return a[sortBy] > b[sortBy] ? sortOrder : -sortOrder;
        });
      }

      res.json({
        success: true,
        data: todos,
        count: todos.length
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/todos/:id
  async getTodoById(req, res, next) {
    try {
      const { id } = req.params;
      const todo = await todoModel.getTodoById(id);

      if (!todo) {
        const error = new Error('Todo not found');
        error.statusCode = 404;
        return next(error);
      }

      res.json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/todos
  async createTodo(req, res, next) {
    try {
      const { error, value } = createTodoSchema.validate(req.body);
      if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        return next(validationError);
      }

      const todo = await todoModel.createTodo(value);

      res.status(201).json({
        success: true,
        data: todo,
        message: 'Todo created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/todos/:id
  async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = updateTodoSchema.validate(req.body);
      
      if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        return next(validationError);
      }

      const todo = await todoModel.updateTodo(id, value);

      if (!todo) {
        const notFoundError = new Error('Todo not found');
        notFoundError.statusCode = 404;
        return next(notFoundError);
      }

      res.json({
        success: true,
        data: todo,
        message: 'Todo updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/v1/todos/:id
  async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await todoModel.deleteTodo(id);

      if (!deleted) {
        const error = new Error('Todo not found');
        error.statusCode = 404;
        return next(error);
      }

      res.json({
        success: true,
        message: 'Todo deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/todos/stats
  async getStats(req, res, next) {
    try {
      const stats = await todoModel.getStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TodoController(); 