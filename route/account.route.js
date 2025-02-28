const express = require('express');
const router = express.Router();

const { tokenValidation } = require('../middleware/token-validation.middleware'); // auth
const requestValidation = require('../middleware/request-validation.middleware'); // validation request

const pathGroup = 'account';

// admin
const adminController = require('../src/controller/account-admin.controller');
const accountAdminValidationRules = require('../src/validation/account-admin.validation');
router.get(`/${pathGroup}/admin`, adminController.showAll);
router.get(`/${pathGroup}/admin/:account_id`, adminController.detail);
router.post(`/${pathGroup}/admin`, accountAdminValidationRules.create, requestValidation, adminController.create);
router.patch(`/${pathGroup}/admin/:account_id`, accountAdminValidationRules.update, requestValidation, adminController.update);
router.delete(`/${pathGroup}/admin/:account_id`, adminController.softDelete);

// // agent
const agentController = require('../src/controller/account-agent.controller');
router.get(`/${pathGroup}/agent`, agentController.showAll);
router.get(`/${pathGroup}/agent/:account_id`, agentController.detail);
router.post(`/${pathGroup}/agent`,requestValidation, agentController.create);
router.patch(`/${pathGroup}/agent/:account_id`,requestValidation, agentController.update);
router.delete(`/${pathGroup}/agent/:account_id`, agentController.softDelete);


module.exports = router;
