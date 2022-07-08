const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const { 
    getUser,
    getUserInventory,
    getUShoppingList,
    getUWishlist
} = require('../../controllers/getinfo/getuserinfo');

const router = Router();

//Gets an user's information
router.get('/user', [
    check('userId', 'User ID is required').isMongoId(),
    fieldValidation
], getUser);

//Gets an user's inventory
router.get('/u-inventory', [

], getUserInventory);

//Gets an user's shopping list
router.get('/u-shoppinglist', [

], getUShoppingList);

//Gets an user's wishlist
router.get('/u-wishlist', [

], getUWishlist);

module.exports = router;