const resFormat = require('../../utility/response-api');

// service
const accountAdminService = require('../service/account-admin.service');

// get all
const showAll = async (req, res, next) => {
    try {
        const data = await accountAdminService.getAll(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

// get detail
const detail = async (req, res, next) => {
    try {
        const data = await accountAdminService.getDetail(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

// create
const create = async (req, res, next) => {
    try {
        const data = await accountAdminService.create(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

// update
const update = async (req, res, next) => {
    try {
        const data = await accountAdminService.update(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

// delete
const softDelete = async (req, res, next) => {
    try {
        const data = await accountAdminService.softDelete(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    showAll,
    detail,
    create,
    update,
    softDelete
};
