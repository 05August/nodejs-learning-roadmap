module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 200]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('todo', 'in-progress', 'review', 'completed', 'cancelled'),
      defaultValue: 'todo'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estimatedHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    actualHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'tasks',
    indexes: [
      {
        fields: ['projectId']
      },
      {
        fields: ['assignedTo']
      },
      {
        fields: ['createdBy']
      },
      {
        fields: ['status']
      },
      {
        fields: ['priority']
      },
      {
        fields: ['dueDate']
      }
    ],
    hooks: {
      beforeUpdate: (task) => {
        if (task.changed('status') && task.status === 'completed') {
          task.completedAt = new Date();
        } else if (task.changed('status') && task.status !== 'completed') {
          task.completedAt = null;
        }
      }
    }
  });

  // Instance methods
  Task.prototype.isOverdue = function() {
    if (!this.dueDate) return false;
    return new Date() > new Date(this.dueDate) && this.status !== 'completed';
  };

  Task.prototype.getDaysUntilDue = function() {
    if (!this.dueDate) return null;
    const today = new Date();
    const dueDate = new Date(this.dueDate);
    const diffTime = dueDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  Task.prototype.isAssignedTo = function(userId) {
    return this.assignedTo === userId;
  };

  Task.prototype.isCreatedBy = function(userId) {
    return this.createdBy === userId;
  };

  Task.prototype.canEdit = function(userId) {
    return this.isAssignedTo(userId) || this.isCreatedBy(userId);
  };

  Task.prototype.addTag = function(tag) {
    if (!this.tags) this.tags = [];
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  };

  Task.prototype.removeTag = function(tag) {
    if (!this.tags) return;
    this.tags = this.tags.filter(t => t !== tag);
  };

  // Associations
  Task.associate = function(models) {
    // Task belongs to Project
    Task.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });

    // Task belongs to User (assigned to)
    Task.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'assignee'
    });

    // Task belongs to User (created by)
    Task.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });
  };

  return Task;
}; 