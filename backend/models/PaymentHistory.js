const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PaymentHistory extends Model {}

PaymentHistory.init({
    payment_history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    credit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'credit_payments',
            key: 'credit_id'
        },
        onDelete: 'CASCADE'
    },
    amount: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    payment_method: {
        type: DataTypes.ENUM('cash', 'credit'),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'PaymentHistory',
    tableName: 'payment_history',
    timestamps: false
});

module.exports = PaymentHistory;
