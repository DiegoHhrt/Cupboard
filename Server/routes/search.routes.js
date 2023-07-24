const { Router } = require('express');
const { check } = require('express-validator');
const { searchUserItem, searchHouseholdItem } = require('../controllers');
const { validateJWT } = require('../middlewares/jwt-validation');
const {
    validateUserListType,
    validateHouseholdListType,
} = require('../middlewares/request-validation');
const { fieldValidation } = require('../middlewares/field-validation');
const router = Router();

router.get(
    '/user/:listType',
    [
        validateJWT,
        validateUserListType,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        fieldValidation,
    ],
    searchUserItem
);
router.get(
    '/:list-type/:field/:term',
    [
        validateJWT,
        validateHouseholdListType,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        fieldValidation,
    ],
    searchHouseholdItem
);

module.exports = router;
