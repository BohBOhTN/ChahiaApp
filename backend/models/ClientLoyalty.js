const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientLoyalty = sequelize.define('ClientLoyalty', {
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'clients',
            key: 'client_id'
        },
        onDelete: 'CASCADE'
    },
    card_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    enrolled_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    points_balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    tableName: 'client_loyalty',
    timestamps: false
});

module.exports = ClientLoyalty;
