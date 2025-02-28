'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            // to account
            this.hasMany(models.account, {
                foreignKey: 'role_id',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            });
        }
    }

    Role.init(
        {
            role_id: {
                type: DataTypes.CHAR(4),
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(255),
                defaultValue: null
            },
            level: {
                type: DataTypes.BOOLEAN,
                defaultValue: null
            },
            visibility: {
                type: DataTypes.BOOLEAN,
                defaultValue: null
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            created_by: {
                type: DataTypes.CHAR(36),
                defaultValue: null
            }
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: 'role',
            timestamps: false
        }
    );

    return Role;
};
