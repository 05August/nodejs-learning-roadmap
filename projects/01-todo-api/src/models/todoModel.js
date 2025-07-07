const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class TodoModel {
  constructor() {
    this.dataFile = path.join(__dirname, '../data/todos.json');
    this.initDataFile();
  }

  async initDataFile() {
    try {
      await fs.access(this.dataFile);
    } catch (error) {
      // File doesn't exist, create it with empty array
      await fs.writeFile(this.dataFile, JSON.stringify([], null, 2));
    }
  }

  async getAllTodos() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to read todos data');
    }
  }

  async getTodoById(id) {
    const todos = await this.getAllTodos();
    return todos.find(todo => todo.id === id);
  }

  async createTodo(todoData) {
    const todos = await this.getAllTodos();
    const newTodo = {
      id: uuidv4(),
      title: todoData.title,
      description: todoData.description || '',
      completed: false,
      priority: todoData.priority || 'medium',
      dueDate: todoData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);
    await this.saveTodos(todos);
    return newTodo;
  }

  async updateTodo(id, updateData) {
    const todos = await this.getAllTodos();
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index === -1) {
      return null;
    }

    todos[index] = {
      ...todos[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    await this.saveTodos(todos);
    return todos[index];
  }

  async deleteTodo(id) {
    const todos = await this.getAllTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    if (filteredTodos.length === todos.length) {
      return false; // Todo not found
    }

    await this.saveTodos(filteredTodos);
    return true;
  }

  async saveTodos(todos) {
    try {
      await fs.writeFile(this.dataFile, JSON.stringify(todos, null, 2));
    } catch (error) {
      throw new Error('Failed to save todos data');
    }
  }

  async getStats() {
    const todos = await this.getAllTodos();
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      pending: todos.filter(todo => !todo.completed).length,
      byPriority: {
        high: todos.filter(todo => todo.priority === 'high').length,
        medium: todos.filter(todo => todo.priority === 'medium').length,
        low: todos.filter(todo => todo.priority === 'low').length
      }
    };
  }
}

module.exports = new TodoModel(); 