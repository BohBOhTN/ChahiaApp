const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Supplier = require('./Supplier');
const Product = require('./Product');

const Purchase = sequelize.define('Purchase', {
    purchase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
            key: 'supplier_id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        }
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    total_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method: {
        type: DataTypes.ENUM('cash', 'credit'),
        allowNull: false
    },
    invoice_number: {
        type: DataTypes.STRING
    },
    invoice_photo_url: {
        type: DataTypes.TEXT
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false,
    tableName: 'purchases'
});

module.exports = Purchase;
