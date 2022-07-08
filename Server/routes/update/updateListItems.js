const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    updateSLItem,
    updateInventoryItem,
    updateWishlistItem,
    updateRecipeItem
} = require('../../controllers/update/updateListItems');
const router = Router();

//Updates the items contained in a shopping list
router.post('/sl-item', [
    check('ownerId', 'Owner ID is required').isMongoId(),
    check('listId','List ID is required').isMongoId(),
    check('action', 'Action is required').not().isEmpty(),
    check('itemId', 'Item ID is required').isMongoId(),
    fieldValidation
], updateSLItem);


//Updates the items contained in an inventory
router.post('/i-item', [
    check('ownerId', 'Owner ID is required').isMongoId(),
    check('listId','List ID is required').isMongoId(),
    check('action', 'Action is required').not().isEmpty(),
    check('itemId', 'Item ID is required').isMongoId(),
    fieldValidation
], updateInventoryItem);

//Updates the items contained in a wishlist
router.post('/w-item', [
    check('ownerId', 'Owner ID is required').isMongoId(),
    check('listId','List ID is required').isMongoId(),
    check('action', 'Action is required').not().isEmpty(),
    check('itemId', 'Item ID is required').isMongoId(),
    fieldValidation
], updateWishlistItem);

//Updates items needed for a food recipe
router.post('/r-item', [
    check(''),
    fieldValidation
], updateRecipeItem);

module.exports = router;