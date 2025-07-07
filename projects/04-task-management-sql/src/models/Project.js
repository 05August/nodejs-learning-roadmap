module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('planning', 'active', 'on-hold', 'completed', 'cancelled'),
      defaultValue: 'planning'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^#[0-9A-F]{6}$/i
      }
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'projects',
    indexes: [
      {
        fields: ['ownerId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['priority']
      }
    ]
  });

  // Instance methods
  Project.prototype.getProgress = async function() {
    const tasks = await this.getTasks();
    if (tasks.length === 0) return 0;
    
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  Project.prototype.isOwner = function(userId) {
    return this.ownerId === userId;
  };

  Project.prototype.isMember = async function(userId) {
    const member = await sequelize.models.ProjectMember.findOne({
      where: {
        projectId: this.id,
        userId: userId
      }
    });
    return !!member || this.isOwner(userId);
  };

  // Associations
  Project.associate = function(models) {
    // Project belongs to User (owner)
    Project.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner'
    });

    // Project has many tasks
    Project.hasMany(models.Task, {
      foreignKey: 'projectId',
      as: 'tasks'
    });

    // Project belongs to many users through ProjectMember
    Project.belongsToMany(models.User, {
      through: models.ProjectMember,
      foreignKey: 'projectId',
      as: 'members'
    });
  };

  return Project;
}; 