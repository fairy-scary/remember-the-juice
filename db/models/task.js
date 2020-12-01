'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskContent: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    userListId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'userId' });
    Task.belongsTo(models.UserList, { foreignKey: 'userListId' });
  };
  return Task;
};