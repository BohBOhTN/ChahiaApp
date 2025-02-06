const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoyaltyProgram = sequelize.define('LoyaltyProgram', {
    program_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    points_percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'loyalty_programs',
    timestamps: false
});

module.exports = LoyaltyProgram;
