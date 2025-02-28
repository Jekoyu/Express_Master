const ErrorNotFoundException =
  require("../../exception/error-not-found.exception").ErrorNotFoundException;
const EncryptDecryptClass = require("../../utility/encrypt-decrypt");
const { v7: uuidv7 } = require("uuid");
const db = require("../../database/mysql.connection");
const { getPagination } = require("../../utility/pagination.utility"); // utility: pagination
const { getMetadataInfo } = require("../../utility/metadata-info.utility"); // utility: metadata record info
const STATUS = require("../constant/status-data.constant"); // constant
const ROLE = require("../constant/account-role.constant"); // constant


// repository
const accountAgentRepo = require('../repository/account-agent.repository');

// --- main service ---
// get all
const getAll = async (req) => {
    try {
        const pageNumber = parseInt(req.query.batch || 1);
        const pageSize = parseInt(req.query.size || 10);
        const pagination = getPagination(pageNumber, pageSize);

        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset
            }
        };

        // set search and/or filter
        const filter = {
            search: req.query.search || false
        };

        // prettier-ignore
        const [data, totalData] = await Promise.all([
            accountAgentRepo.findAll(options, filter),
            accountAgentRepo.count(filter)
        ]);

        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize
            },
            records: data
        };
    } catch (error) {
        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

// get detail
const getDetail = async (req) => {
    try {
        const dataId = req.params.account_id;

        // get data by 'account_id'
        const data = await accountAgentRepo.findOne({ account_id: dataId });

        if (!data) {
            throw new ErrorNotFoundException();
        }

        return data;
    } catch (error) {
        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

// create
const create = async (req) => {
    // set transaction
    const transaction = await db.sequelize.transaction();

    try {
        const encryptDecrypt = new EncryptDecryptClass();

        // get metadata
        const metadata = getMetadataInfo(req);


        console.error(`--- Service Error: ${metadata.current_datetime}`);
        const payload = {
            account_id: uuidv7(),
            name: req.body.name,
            dial_code: req.body.dial_code,
            phone: req.body.phone,
            email: req.body.email,
            role_id: ROLE.ADMIN, // (hardcode)
            user_name: req.body.username.toLowerCase(),
            pass_word: encryptDecrypt.encryptBcrypt(req.body.password), // hash password using bcrypt
            account_status_id: req.body.account_status,
            last_login: metadata.current_datetime,
            referral: req.body.username.toLowerCase(),
            created_at: metadata.current_datetime,
            created_by: metadata.account_id,
            modified_at: metadata.current_datetime,
            modified_by: metadata.account_id
        };

        const createData = await accountAgentRepo.create(payload, transaction);

        // commit transaction
        await transaction.commit();

        return createData;
    } catch (error) {
        // rollback transaction
        await transaction.rollback();

        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

// update
const update = async (req) => {
    const dataId = req.params.account_id;

    // set transaction
    const transaction = await db.sequelize.transaction();

    try {
        // get metadata
        const metadata = getMetadataInfo(req);

        const payload = {
            name: req.body.name,
            dial_code: req.body.dial_code,
            phone: req.body.phone,
            email: req.body.email,
            user_name: req.body.username.toLowerCase(),
            account_status_id: req.body.account_status,
            modified_at: metadata.current_datetime,
            modified_by: metadata.account_id
        };

        // update data by 'account_id'
        await accountAgentRepo.update(payload, { account_id: dataId }, transaction);

        // commit transaction
        await transaction.commit();

        return payload;
    } catch (error) {
        // rollback transaction
        await transaction.rollback();

        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

// delete (soft-delete)
const softDelete = async (req) => {
    const dataId = req.params.account_id;

    // set transaction
    const transaction = await db.sequelize.transaction();

    try {
        // get metadata
        const metadata = getMetadataInfo(req);

        const payload = {
            account_status_id: STATUS.DELETED, // (hardcode)
            modified_at: metadata.current_datetime,
            modified_by: metadata.account_id
        };

        // update data by 'account_id'
        await accountAgentRepo.update(payload, { account_id: dataId }, transaction);

        // commit transaction
        await transaction.commit();

        return payload;
    } catch (error) {
        // rollback transaction
        await transaction.rollback();

        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getAll,
    getDetail,
    create,
    update,
    softDelete
};
