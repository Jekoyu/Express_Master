const { body, param } = require('express-validator');
const STATUS = require('../constant/status-data.constant');

// repository
const accountAdminRepo = require('../repository/account-admin.repository');

// create data
// prettier-ignore
const create = [
	body('name', 'Data is required')
		.exists({ checkFalsy: true }),
	body('username', 'Data is required')
		.exists({ checkFalsy: true })
		.trim()
		.custom(async value => {
			const account = await accountAdminRepo.getTotalAccount({ user_name: value });
			if (account > 0) {
				throw new Error('Username has been used!');
			}
			return true;
		}),
	body('dial_code', 'Data is required')
		.exists({ checkFalsy: true })
		.trim()
		.isNumeric().withMessage('Data must be numeric!'),
	body('phone', 'Data is required')
		.exists({ checkFalsy: true })
		.trim()
		.isNumeric().withMessage('Data must be numeric!'),
	body('email', 'Data is required')
		.exists({ checkFalsy: true })
		.trim()
		.isEmail().withMessage('Email invalid!'),
	body('account_status', 'Data is required')
		.exists({ checkFalsy: true })
		.isIn([STATUS.ACTIVE, STATUS.INACTIVE]).withMessage(`Status data must be '${STATUS.ACTIVE}' or '${STATUS.INACTIVE}'.`)
];

// update data
// prettier-ignore
const update = [
	param('account_id', 'Data is required')
		.exists({ checkFalsy: true })
		.custom(async value => {
			const account = await accountAdminRepo.getTotalAccount({ account_id: value });
			if (account == 0) {
				throw new Error('Data not found!');
			}
			return true;
		}),
	body('name', 'Data is required')
		.exists({ checkFalsy: true }),
	body('dial_code', 'Data is required')
		.exists({ checkFalsy: true })
		.trim()
		.isNumeric().withMessage('Data must be numeric!'),
	body('phone', 'Data is required')
		.exists({ checkFalsy: true })
		.trim()
		.isNumeric().withMessage('Data must be numeric!'),
	body('email', 'Data is required')
		.exists({ checkFalsy: true })
		.trim()
		.isEmail().withMessage('Email invalid'),
	body('account_status', 'Data is required')
		.exists({ checkFalsy: true })
		.isIn([STATUS.ACTIVE, STATUS.INACTIVE]).withMessage(`Status data must be '${STATUS.ACTIVE}' or '${STATUS.INACTIVE}'.`)
];

module.exports = {
    create,
    update
};
