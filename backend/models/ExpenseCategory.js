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
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ExpenseCategory',
    tableName: 'expense_categories',
    timestamps: false
});

module.exports = ExpenseCategory;
