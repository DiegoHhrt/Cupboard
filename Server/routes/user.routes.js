const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, getUserList, updateUser, deleteUser } = require('../controllers');
const {
    fieldValidation,
    validateJWT,
    validateUserListType,
    validateUserIsActive,
} = require('../middlewares');
const { mailExp } = require('../helpers');
const router = Router();

//Gets an user's information
router.get('/get-self', [validateJWT, validateUserIsActive, fieldValidation], getUser);

router.get(
    '/get-list/:listType',
    [
        validateJWT,
        validateUserIsActive,
        validateUserListType,
        check('listType', 'Valid list type is required').isIn([
            'inventory',
            'shopping-list',
            'wishlist',
        ]),
        fieldValidation,
    ],
    getUserList
);

//Updates an user's information
router.put(
    '/update-self',
    [
        validateJWT,
        validateUserIsActive,
        check('name', 'User name must be at least 4 characters')
            .optional()
            .isLength({ min: 4 }),
        check('userName', 'User name must be at least 4 characters')
            .optional()
            .isLength({ min: 4 }),
        check('email', 'Valid email is required').optional().isEmail().matches(mailExp),
        check('password', 'Password must be +6 characters long')
            .optional()
            .isLength({ min: 6 }),
        check('budget', 'A budget of 0 or greater is required').optional().isInt({ min: 0 }),
        fieldValidation,
    ],
    updateUser
);

router.delete(
    '/delete-self',
    [validateJWT, validateUserIsActive, fieldValidation],
    deleteUser
);
module.exports = router;
