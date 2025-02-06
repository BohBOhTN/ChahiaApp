const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoyaltyTransaction = sequelize.define('LoyaltyTransaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'client_id'
        },
        onDelete: 'CASCADE'
    },
    sale_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'sales',
            key: 'sale_id'
        },
        onDelete: 'SET NULL'
    },
    points_delta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    transaction_type: {
        type: DataTypes.ENUM('earn', 'redeem'),
        allowNull: false
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    points_percentage: {
        type: DataTypes.DECIMAL(5, 2)
    },
    notes: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'loyalty_transactions',
    timestamps: false
});

module.exports = LoyaltyTransaction;
