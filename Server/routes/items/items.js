const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    createListItem,
    createRecipeItem,
    updateItem,
    getItem,
    deleteItem
} = require('../../controllers/items/items');

const router = Router();

//Creates a new item in a shopping list
router.post('/create-item', [
    check('listId', 'List ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('listType', 'List type is required').isIn(['SL', 'W', 'I']),
    check('name', 'Name is required').not().isEmpty(),
    check('edible', 'Is necessary to specify if the item is edible or not').isBoolean(),
    check('category', 'Is necessary to specify category/ies for the item').isArray().isLength({ min: 1 }),
    check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
    check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
    check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
    check('unit', 'Insert a valid unit').not().isEmpty(),
    check('lowLevel', 'Insert a valid low level').optional().isNumeric({ min: 0, max: 100 }),
    check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
    check('imgUrl', 'Insert a valid image URL').optional().isURL(),
    fieldValidation
], createListItem);

//Creates an item in a recipe
router.post('/create-r-item', [
    check('listId', 'List ID is required').isMongoId(),
    check('name', 'Name is required').not().isEmpty(),
    check('edible', 'Is necessary to specify if the item is edible or not').isBoolean(),
    check('category', 'Is necessary to specify category/ies for the item').isArray().isLength({ min: 1 }),
    check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
    check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
    check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
    check('unit', 'Insert a valid unit').not().isEmpty(),
    check('lowLevel', 'Insert a valid low level').optional().isNumeric({ min: 0, max: 100 }),
    check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
    fieldValidation
], createRecipeItem);

//Updates existent item
router.post('/update', [
    check('itemId', 'Item ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('listId', 'List ID is required').isMongoId(),
    check('isInListType', 'List type is required').isIn(['SL', 'W', 'I']),
    check('field', 'Field to update is required').not().isEmpty(),   
    check('value', 'Value to update is required').not().isEmpty(),
    fieldValidation
], updateItem);

//Gets a specific item
router.post('/get', [
    check('itemId', 'Item ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('listId', 'List ID is required').isMongoId(),
    check('isInListType', 'List type is required').isIn(['SL', 'W', 'I']),
    fieldValidation
], getItem);

//Deletes a specific item
router.post('/delete', [
    check('itemId', 'Item ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('listId', 'List ID is required').isMongoId(),
    check('isInListType', 'List type is required').isIn(['SL', 'W', 'I']),
    fieldValidation
], deleteItem);

module.exports = router;