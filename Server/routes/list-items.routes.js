const { Router } = require('express');
const { check } = require('express-validator');
const {
    createListEdibleItem,
    createListItem,
    createRecipeItem,
    deleteItem,
    getItem,
    updateItem,
    getWishlistItem,
    getRecipeItem,
    getSLItem,
    getInventoryItem,
} = require('../controllers');
const { fieldValidation, jsonValidation } = require('../middlewares');

const router = Router();

//TODO: simplify by using params in a single request

//Gets the items contained in a shopping list
router.get(
    '/sl-item',
    [
        check('ownerId', 'Owner ID is required').isMongoId(),
        check('listId', 'List ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('filters', 'An array of filters is required')
            .optional()
            .isArray()
            .isLength({ min: 1 }),
        check('edible', "That's not a valid request").optional().isBoolean(),
        fieldValidation,
    ],
    getSLItem
);

//Gets the items contained in an inventory
router.get(
    '/i-item',
    [
        check('ownerId', 'Owner ID is required').isMongoId(),
        check('listId', 'List ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('filters', 'An array of filters is required')
            .optional()
            .isArray()
            .isLength({ min: 1 }),
        check('edible', "That's not a valid request").optional().isBoolean(),
        fieldValidation,
    ],
    getInventoryItem
);

//Gets the items contained in a wishlist
router.get(
    '/w-item',
    [
        check('ownerId', 'Owner ID is required').isMongoId(),
        check('listId', 'List ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('filters', 'An array of filters is required')
            .optional()
            .isArray()
            .isLength({ min: 1 }),
        check('edible', "That's not a valid request").optional().isBoolean(),
        fieldValidation,
    ],
    getWishlistItem
);

//TODO: simplify by using params in a single request
//TODO: bind item creation to list type by params, example: '/r-item'/:list-id

//Gets items needed for a food recipe
router.get('/r-item', [], getRecipeItem);

//Creates a new non edible item in a list
router.post(
    '/create-ne-item',
    [
        check('listId', 'List ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('listType', 'List type is required').isIn(['SL', 'W', 'I']),
        check('name', 'Name is required').not().isEmpty(),
        check('edible', 'Please use the correct endpoint to save edibles')
            .isBoolean()
            .equals('false'),
        check('category', 'Is necessary to specify category/ies for the item')
            .isArray()
            .isLength({ min: 1 }),
        check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
        check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
        check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
        check('unit', 'Insert a valid unit').not().isEmpty(),
        check('lowLevel', 'Insert a valid low level')
            .optional()
            .isNumeric({ min: 0, max: 100 }),
        check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
        check('imgUrl', 'Insert a valid image URL').optional().isURL(),
        fieldValidation,
    ],
    createListItem
);

//Creates a new edible item in a list
router.post(
    '/create-e-item',
    [
        check('listId', 'List ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('listType', 'List type is required').isIn(['SL', 'W', 'I']),
        check('name', 'Name is required').not().isEmpty(),
        check('edible', 'Please use the correct endpoint to save non edibles')
            .isBoolean()
            .equals(true),
        check('category', 'Is necessary to specify category/ies for the item')
            .isArray()
            .isLength({ min: 1 }),
        check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
        check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
        check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
        check('unit', 'Insert a valid unit').not().isEmpty(),
        check('lowLevel', 'Insert a valid low level')
            .optional()
            .isNumeric({ min: 0, max: 100 }),
        check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
        check('imgUrl', 'Insert a valid image URL').optional().isURL(),
        jsonValidation,
        fieldValidation,
    ],
    createListEdibleItem
);

//Creates an item in a recipe
router.post(
    '/create-r-item',
    [
        check('listId', 'List ID is required').isMongoId(),
        check('name', 'Name is required').not().isEmpty(),
        check('edible', 'Is necessary to specify if the item is edible or not').isBoolean(),
        check('category', 'Is necessary to specify category/ies for the item')
            .isArray()
            .isLength({ min: 1 }),
        check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
        check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
        check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
        check('unit', 'Insert a valid unit').not().isEmpty(),
        check('lowLevel', 'Insert a valid low level')
            .optional()
            .isNumeric({ min: 0, max: 100 }),
        check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
        fieldValidation,
    ],
    createRecipeItem
);

//Updates existent item
router.post(
    '/update',
    [
        check('itemId', 'Item ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('listId', 'List ID is required').isMongoId(),
        check('isInListType', 'List type is required').isIn(['SL', 'W', 'I']),
        check('field', 'Field to update is required').not().isEmpty(),
        check('value', 'Value to update is required').not().isEmpty(),
        fieldValidation,
    ],
    updateItem
);

//Gets a specific item
router.post(
    '/get',
    [
        check('itemId', 'Item ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('listId', 'List ID is required').isMongoId(),
        check('isInListType', 'List type is required').isIn(['SL', 'W', 'I']),
        fieldValidation,
    ],
    getItem
);

//Deletes a specific item
router.post(
    '/delete',
    [
        check('itemId', 'Item ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('listId', 'List ID is required').isMongoId(),
        check('isInListType', 'List type is required').isIn(['SL', 'W', 'I']),
        fieldValidation,
    ],
    deleteItem
);

module.exports = router;
