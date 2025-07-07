module.exports = (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define('ProjectMember', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.ENUM('member', 'admin'),
      defaultValue: 'member'
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'project_members',
    indexes: [
      {
        unique: true,
        fields: ['projectId', 'userId']
      },
      {
        fields: ['projectId']
      },
      {
        fields: ['userId']
      }
    ]
  });

  // Instance methods
  ProjectMember.prototype.isAdmin = function() {
    return this.role === 'admin';
  };

  ProjectMember.prototype.canManageProject = function() {
    return this.role === 'admin';
  };

  // Associations
  ProjectMember.associate = function(models) {
    // ProjectMember belongs to User
    ProjectMember.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    // ProjectMember belongs to Project
    ProjectMember.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
  };

  return ProjectMember;
}; 