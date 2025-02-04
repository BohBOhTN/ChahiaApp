const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ExpenseCategory extends Model {}

ExpenseCategory.init({
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'ExpenseCategory',
    tableName: 'expense_categories',
    timestamps: false
});

module.exports = ExpenseCategory;
