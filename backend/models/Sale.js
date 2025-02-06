const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./Client');
const Product = require('./Product');

const Sale = sequelize.define('Sale', {
    sale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'client_id'
        },
        onDelete: 'SET NULL'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        },
        onDelete: 'RESTRICT'
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: sequelize.literal('quantity * unit_price')
    },
    payment_method: {
        type: DataTypes.ENUM('cash', 'credit'),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false,
    tableName: 'sales'
});

module.exports = Sale;
