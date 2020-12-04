'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserList = sequelize.define('UserList', {
    listName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  UserList.associate = function (models) {
    UserList.belongsTo(models.User, { foreignKey: 'userId' });
    UserList.hasMany(models.Task, { foreignKey: 'userListId' });
  };
  return UserList;
};