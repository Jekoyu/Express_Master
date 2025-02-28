const ErrorQueryException = require('../../exception/error-query.exception').ErrorQueryException;
const errorFormat = require('../../utility/error-format');
const STATUS = require('../constant/status-data.constant'); // constant
const ROLE = require('../constant/account-role.constant'); // constant

// model
const db = require('../../database/mysql.connection');
const Account = db.account;
const Role = db.role;
const AccountStatus = db.account_status;

// --- main repository ---
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search = null } = filter;

        const config = {
            attributes: ['account_id', 'name', 'dial_code', 'phone', 'email', 'user_name', 'last_login'],
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['role_id', 'name', 'description']
                },
                {
                    model: AccountStatus,
                    as: 'account_status',
                    attributes: ['account_status_id', 'name', 'description', 'color_text_label', 'color_background_label']
                }
            ],
            where: {
                // just get the active and inactive account_status_id
                '$account.account_status_id$': {
                    [db.Op.in]: [STATUS.ACTIVE, STATUS.INACTIVE]
                },
                // just get the 'super admin' and 'admin' role_id
                '$account.role_id$': {
                    [db.Op.in]: [ROLE.SUPER_ADMIN, ROLE.ADMIN]
                }
            },
            order: [['created_at', 'DESC']],
            limit: pagination.limit,
            offset: pagination.offset
        };

        // if using search
        if (search) {
            config.where = {
                ...config.where,
                [db.Op.or]: {
                    '$account.name$': {
                        [db.Op.like]: `%${search}%`
                    },
                    '$account.phone$': {
                        [db.Op.like]: `%${search}%`
                    },
                    '$account.email$': {
                        [db.Op.like]: `%${search}%`
                    },
                    '$account.user_name$': {
                        [db.Op.like]: `%${search}%`
                    }
                }
            };
        }

        return await Account.findAll(config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

const count = async (filter) => {
    try {
        const { search = null } = filter;

        const config = {
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['role_id', 'name', 'description']
                },
                {
                    model: AccountStatus,
                    as: 'account_status',
                    attributes: ['account_status_id', 'name', 'description', 'color_text_label', 'color_background_label']
                }
            ],
            where: {
                // just get the active and inactive account_status_id
                '$account.account_status_id$': {
                    [db.Op.in]: [STATUS.ACTIVE, STATUS.INACTIVE]
                },
                // just get the 'super admin' and 'admin' role_id
                '$account.role_id$': {
                    [db.Op.in]: [ROLE.SUPER_ADMIN, ROLE.ADMIN]
                }
            }
        };

        // if using search
        if (search) {
            config.where = {
                ...config.where,
                [db.Op.or]: {
                    '$account.name$': {
                        [db.Op.like]: `%${search}%`
                    },
                    '$account.phone$': {
                        [db.Op.like]: `%${search}%`
                    },
                    '$account.email$': {
                        [db.Op.like]: `%${search}%`
                    },
                    '$account.user_name$': {
                        [db.Op.like]: `%${search}%`
                    }
                }
            };
        }

        return await Account.count(config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

const findOne = async (where) => {
    try {
        const config = {
            attributes: ['account_id', 'name', 'dial_code', 'phone', 'email', 'user_name', 'last_login'],
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['role_id', 'name', 'description']
                },
                {
                    model: AccountStatus,
                    as: 'account_status',
                    attributes: ['account_status_id', 'name', 'description', 'color_text_label', 'color_background_label']
                }
            ],
            where: {
                ...where,
                '$account.account_status_id$': {
                    [db.Op.in]: [STATUS.ACTIVE, STATUS.INACTIVE]
                },
                // just get the 'super admin' and 'admin' role_id
                '$account.role_id$': {
                    [db.Op.in]: [ROLE.SUPER_ADMIN, ROLE.ADMIN]
                }
            }
        };

        return await Account.findOne(config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

const create = async (payload, transaction = null) => {
    try {
        const config = {};

        // set transaction
        if (transaction) {
            config.transaction = transaction;
        }

        return await Account.create(payload, config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

const update = async (payload, where, transaction = null) => {
    try {
        const config = {
            where: where
        };

        // set transaction
        if (transaction) {
            config.transaction = transaction;
        }

        return await Account.update(payload, config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

// --- functional repository ---
// used in validation (create, update)
const getTotalAccount = async (where = {}, exclude) => {
    try {
        const config = {
            where: where
        };

        // if use 'exclude', for find other data
        // - used for check data in 'update data' (validation)
        if (exclude) {
            config.where = {
                ...where,
                account_id: {
                    [db.Op.not]: exclude
                }
            };
        }

        return await Account.count(config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

module.exports = {
    findAll,
    count,
    findOne,
    create,
    update,
    getTotalAccount
};
