const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');

const router = Router();

//Gets an user's information
router.get('/user', [

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