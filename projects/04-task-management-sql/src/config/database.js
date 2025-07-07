const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'task_management',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Import models
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const ProjectMember = require('../models/ProjectMember');

// Initialize models
const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Project: Project(sequelize, Sequelize.DataTypes),
  Task: Task(sequelize, Sequelize.DataTypes),
  ProjectMember: ProjectMember(sequelize, Sequelize.DataTypes)
};

// Define associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export sequelize instance and models
module.exports = {
  sequelize,
  Sequelize,
  ...models
}; 