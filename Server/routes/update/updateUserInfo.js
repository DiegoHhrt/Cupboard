const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    updateUser,
    updateUserInventory,
    updateUShoppingList,
    updateUWishlist,
    editUserHousehold
} = require('../../controllers/update/updateUserInfo');

const router = Router();

//Updates an user's information
router.post('/user', [
    fieldValidation
], updateUser);

//Updates an user's inventory
router.post('/u-inventory', [
    fieldValidation
], updateUserInventory);

//Updates an user's shopping list
router.post('/u-shoppinglist', [
    fieldValidation
], updateUShoppingList);

//Updates an user's wishlist
router.post('/u-wishlist', [
    fieldValidation
], updateUWishlist);

//Join user to household or remove user from household
router.post('/join', [
    check('userId', 'User ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('householdId', 'Household ID is required').isMongoId(),
    check('action', 'Valid action is required').isIn(['join', 'remove']),
    fieldValidation
], editUserHousehold);

module.exports = router;