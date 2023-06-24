const { Router } = require('express');
const { check } = require('express-validator');
const {
    getUser,
    getUserInventory,
    getUShoppingList,
    getUWishlist,
    editUserHousehold,
    updateUser,
    updateUserInventory,
    updateUShoppingList,
    updateUWishlist,
} = require('../controllers');
const { fieldValidation } = require('../middlewares');
const router = Router();

//Gets an user's information
router.get(
    '/user',
    [check('userId', 'User ID is required').isMongoId(), fieldValidation],
    getUser
);

//TODO: simplify by using params in a single request
//Gets an user's inventory
router.get('/u-inventory', [], getUserInventory);

//Gets an user's shopping list
router.get('/u-shoppinglist', [], getUShoppingList);

//Gets an user's wishlist
router.get('/u-wishlist', [], getUWishlist);

//Join user to household or remove user from household
router.post(
    '/join',
    [
        check('userId', 'User ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('householdId', 'Household ID is required').isMongoId(),
        check('action', 'Valid action is required').isIn(['join', 'remove']),
        fieldValidation,
    ],
    editUserHousehold
);

//TODO: simplify by using params in a single request
//Updates an user's information
router.post('/user', [fieldValidation], updateUser);

//Updates an user's inventory
router.post('/u-inventory', [fieldValidation], updateUserInventory);

//Updates an user's shopping list
router.post('/u-shoppinglist', [fieldValidation], updateUShoppingList);

//Updates an user's wishlist
router.post('/u-wishlist', [fieldValidation], updateUWishlist);

module.exports = router;
