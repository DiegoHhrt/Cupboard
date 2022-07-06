const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    updateSLItem,
    updateInventoryItem,
    updateWishlistItem,
    updateRecipeItem
} = require('../../controllers/update/updateItems');
const router = Router();

//Updates the items contained in a shopping list
router.post('/sl-item', [

], updateSLItem);


//Updates the items contained in an inventory
router.post('/i-item', [

], updateInventoryItem);

//Updates the items contained in a wishlist
router.post('/w-item', [

], updateWishlistItem);

//Updates items needed for a food recipe
router.post('/r-item', [

], updateRecipeItem);

module.exports = router;