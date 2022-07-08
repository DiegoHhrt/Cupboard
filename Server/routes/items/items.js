const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    createItem,
    updateItem,
    getItem,
    getItems,
    deleteItem
} = require('../../controllers/items/items');

const router = Router();

//Creates a new item
router.post('/create', [
    fieldValidation
], createItem);

//Updates existent item
router.post('/update', [
    fieldValidation
], updateItem);

//Gets a specific item
router.get('/get', [
    fieldValidation
], getItem);

//Gets several items 
router.get('/get-items', [
    fieldValidation
], getItems);

//Deletes a specific item
router.post('/delete', [
    fieldValidation
], deleteItem);

module.exports = router;