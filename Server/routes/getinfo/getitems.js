const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    getSLItem,
    getInventoryItem,
    getWishlistItem,
    getRecipeItem
} = require('../../controllers/getinfo/getItems');

const router = Router();

//Gets the items contained in a shopping list
router.get('/sl-item', [

], getSLItem);


//Gets the items contained in an inventory
router.get('/i-item', [

], getInventoryItem);

//Gets the items contained in a wishlist
router.get('/w-item', [

], getWishlistItem);

//Gets items needed for a food recipe
router.get('/r-item', [

], getRecipeItem);

module.exports = router;