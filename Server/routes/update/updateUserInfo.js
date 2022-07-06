const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    updateUser,
    updateUserInventory,
    updateUShoppingList,
    updateUWishlist
} = require('../../controllers/update/updateUserInfo');

const router = Router();

//Updates an user's information
router.post('/user', [

], updateUser);

//Updates an user's inventory
router.post('/u-inventory', [

], updateUserInventory);

//Updates an user's shopping list
router.post('/u-shoppinglist', [

], updateUShoppingList);

//Updates an user's wishlist
router.post('/u-wishlist', [

], updateUWishlist);

module.exports = router;