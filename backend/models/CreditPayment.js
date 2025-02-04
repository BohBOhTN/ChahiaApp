const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sale = require('./Sale');
const Client = require('./Client');

const CreditPayment = sequelize.define('CreditPayment', {
    credit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sale,
            key: 'sale_id'
        }
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'client_id'
        }
    },
    total_due: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    total_paid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    status: {
        type: DataTypes.ENUM('paid', 'unpaid', 'partially_paid'),
        allowNull: false,
        defaultValue: 'unpaid'
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false,
    tableName: 'credit_payments'
});

module.exports = CreditPayment;
