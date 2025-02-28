'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AccountStatus extends Model {
        static associate(models) {
            // to account
            this.hasMany(models.account, {
                foreignKey: 'account_status_id',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            });
        }
    }

    AccountStatus.init(
        {
            account_status_id: {
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
            visibility: {
                type: DataTypes.BOOLEAN,
                defaultValue: null
            },
            order: {
                type: DataTypes.INTEGER(1),
                defaultValue: null
            },
            color_text_label: {
                type: DataTypes.STRING(10),
                defaultValue: null
            },
            color_background_label: {
                type: DataTypes.STRING(10),
                defaultValue: null
            },
            color_text_button: {
                type: DataTypes.STRING(10),
                defaultValue: null
            },
            color_background_button: {
                type: DataTypes.STRING(10),
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
            modelName: 'account_status',
            timestamps: false
        }
    );

    return AccountStatus;
};
