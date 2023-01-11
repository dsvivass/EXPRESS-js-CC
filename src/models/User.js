const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // freezeTableName: true, // Model tableName will be the same as the model name, ie: Instead of users, it will be User
    tableName : 'users', // Model tableName will be the same as the model name, ie: Instead of users, it will be User
    timestamps: false, // Disable timestamps
});

module.exports = User;