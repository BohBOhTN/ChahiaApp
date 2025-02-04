const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Expense extends Model {}

Expense.init({
    expense_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'expense_categories',
            key: 'category_id'
        },
        onDelete: 'RESTRICT'
    },
    amount: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    expense_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    is_recurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses',
    timestamps: false
});

module.exports = Expense;
