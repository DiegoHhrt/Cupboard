const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    getSLItem,
    getInventoryItem,
    getWishlistItem,
    getRecipeItem
} = require('../../controllers/getinfo/getListItems');

const router = Router();

//Gets the items contained in a shopping list
router.get('/sl-item', [
    check('ownerId', 'Owner ID is required').isMongoId(),
    check('listId','List ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('filters', 'An array of filters is required').optional().isArray().isLength({min:1}),
    check('edible', "That's not a valid request").optional().isBoolean(),
    fieldValidation
], getSLItem);


//Gets the items contained in an inventory
router.get('/i-item', [
    check('ownerId', 'Owner ID is required').isMongoId(),
    check('listId','List ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('filters', 'An array of filters is required').optional().isArray().isLength({min:1}),
    check('edible', "That's not a valid request").optional().isBoolean(),
    fieldValidation
], getInventoryItem);

//Gets the items contained in a wishlist
router.get('/w-item', [
    check('ownerId', 'Owner ID is required').isMongoId(),
    check('listId','List ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('filters', 'An array of filters is required').optional().isArray().isLength({min:1}),
    check('edible', "That's not a valid request").optional().isBoolean(),
    fieldValidation
], getWishlistItem);

//Gets items needed for a food recipe
router.get('/r-item', [

], getRecipeItem);

module.exports = router;