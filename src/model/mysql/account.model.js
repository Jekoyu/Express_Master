'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            // from role
            this.belongsTo(models.role, {
                foreignKey: 'role_id',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
                as: 'role'
            });

            // from account_status
            this.belongsTo(models.account_status, {
                foreignKey: 'account_status_id',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
                as: 'account_status'
            });
        }
    }

    Account.init(
        {
            account_id: {
                type: DataTypes.CHAR(36),
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            dial_code: {
                type: DataTypes.STRING(5),
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING(16),
                defaultValue: null
            },
            email: {
                type: DataTypes.STRING(255),
                defaultValue: null
            },
            role_id: {
                type: DataTypes.CHAR(4),
                defaultValue: null
            },
            user_name: {
                type: DataTypes.STRING(255),
                defaultValue: null
            },
            pass_word: {
                type: DataTypes.STRING(255),
                defaultValue: null
            },
            account_status_id: {
                type: DataTypes.CHAR(4),
                defaultValue: null
            },
            referral: {
                type: DataTypes.STRING(50),
                defaultValue: null
            },
            last_login: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            created_by: {
                type: DataTypes.CHAR(36),
                defaultValue: null
            },
            modified_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            modified_by: {
                type: DataTypes.CHAR(36),
                defaultValue: null
            },
            id_admin: {
                type: DataTypes.INTEGER,
                defaultValue: null
            }
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: 'account',
            timestamps: false
        }
    );

    return Account;
};
