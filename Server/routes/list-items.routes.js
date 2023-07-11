const { Router } = require('express');
const { check } = require('express-validator');
const {
    createListEdibleItem,
    createListItem,
    createRecipeItem,
    deleteItem,
    getItem,
    getItems,
    updateItem,
    getRecipeItem,
} = require('../controllers');
const {
    fieldValidation,
    jsonValidation,
    validateJWT,
    validateUserListType,
    validateHouseholdListType,
    validateItemExists,
} = require('../middlewares');
const { categoryExists, userBelongsToHousehold } = require('../helpers');

const router = Router();

router.get(
    '/user/get-items/:listType',
    [
        validateJWT,
        validateUserListType,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        fieldValidation,
    ],
    getItems
);

router.get(
    '/user/get-item/:listType/:itemId',
    [
        validateJWT,
        validateUserListType,
        validateItemExists,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        fieldValidation,
    ],
    getItem
);

router.get(
    '/household/get-items/:listType',
    [
        validateJWT,
        validateHouseholdListType,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        fieldValidation,
    ],
    getItems
);

router.get(
    '/household/get-item/:listType/:itemId',
    [
        validateJWT,
        validateHouseholdListType,
        validateItemExists,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        fieldValidation,
    ],
    getItem
);

//TODO: simplify by using params in a single request
//TODO: simplify by using a middleware to validate common fields
//TODO: Rework edible creation

//Creates a new non edible item in an user's list
router.post(
    '/user/create-item/:listType',
    [
        validateJWT,
        validateUserListType,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        check('name', 'Name is required').not().isEmpty(),
        check('edible', 'Please use the correct endpoint to save edibles')
            .isBoolean()
            .equals('false'),
        check('category', 'Is necessary to specify category/ies for the item')
            .isArray()
            .isLength({ min: 1 }),
        // .custom(categoryExists), //TODO: Transform category validation to deal with arrays
        check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
        check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
        check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
        check('unit', 'Insert a valid unit').not().isEmpty(), //TODO: Validate unit types
        check('lowLevel', 'Insert a valid low level')
            .optional()
            .isNumeric({ min: 0, max: 100 }),
        check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
        check('imgUrl', 'Insert a valid image URL').optional().isURL(),
        fieldValidation,
    ],
    createListItem
);

//Creates a new edible item in an user's list
router.post(
    '/user/create-edible-item/:listType',
    [
        validateJWT,
        validateUserListType,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        check('name', 'Name is required').not().isEmpty(),
        check('edible', 'Please use the correct endpoint to save non edibles')
            .isBoolean()
            .equals(true),
        check('category', 'Is necessary to specify category/ies for the item')
            .isArray()
            .isLength({ min: 1 })
            .custom(categoryExists), //TODO: Transform category validation to deal with arrays
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
//Creates a new non edible item in a household's list
router.post(
    '/household/create-item/:listType',
    [
        validateJWT,
        validateHouseholdListType,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        check('name', 'Name is required').not().isEmpty(),
        check('edible', 'Please use the correct endpoint to save edibles')
            .isBoolean()
            .equals('false'),
        check('category', 'Is necessary to specify category/ies for the item')
            .isArray()
            .isLength({ min: 1 })
            .custom(categoryExists), //TODO: Transform category validation to deal with arrays
        check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
        check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
        check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
        check('unit', 'Insert a valid unit').not().isEmpty(), //TODO: Validate unit types
        check('lowLevel', 'Insert a valid low level')
            .optional()
            .isNumeric({ min: 0, max: 100 }),
        check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
        check('imgUrl', 'Insert a valid image URL').optional().isURL(),
        fieldValidation,
    ],
    createListItem
);

//Creates a new edible item in a household's list
router.post(
    '/household/create-edible-item/:listType',
    [
        validateJWT,
        validateHouseholdListType,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        check('name', 'Name is required').not().isEmpty(),
        check('edible', 'Please use the correct endpoint to save non edibles')
            .isBoolean()
            .equals(true),
        check('category', 'Is necessary to specify category/ies for the item')
            .isArray()
            .isLength({ min: 1 })
            .custom(categoryExists), //TODO: Transform category validation to deal with arrays
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

//Creates an item in a recipe (planned food)
router.post(
    '/household/create-recipe-item',
    [
        validateJWT,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
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

//Updates existent item from an user list
router.put(
    '/user/:listType/:itemId',
    [
        validateJWT,
        validateUserListType,
        validateItemExists,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        check('category', 'Is necessary to specify category/ies for the item')
            .optional()
            .isArray()
            .isLength({ min: 1 })
            .custom(categoryExists),
        check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
        check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
        check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
        check('unit', 'Insert a valid unit').optional(), //TODO: Validate unit types
        check('lowLevel', 'Insert a valid low level')
            .optional()
            .isNumeric({ min: 0, max: 100 }),
        check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
        check('imgUrl', 'Insert a valid image URL').optional().isURL(),
        fieldValidation,
    ],
    updateItem
);
//Updates existent item from a household list
router.put(
    '/household/:listType/:itemId',
    [
        validateJWT,
        validateHouseholdListType,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        check('category', 'Is necessary to specify category/ies for the item')
            .optional()
            .isArray()
            .isLength({ min: 1 })
            .custom(categoryExists),
        check('purchaseDate', 'Insert a valid purchase date').optional().isDate(),
        check('currentAmmount', 'Insert a valid current ammount').optional().isNumeric(),
        check('boughtAmmount', 'Insert a valid bought ammount').optional().isNumeric(),
        check('unit', 'Insert a valid unit').optional(), //TODO: Validate unit types
        check('lowLevel', 'Insert a valid low level')
            .optional()
            .isNumeric({ min: 0, max: 100 }),
        check('cost', 'Insert a valid cost').optional().isNumeric({ min: 0 }),
        check('imgUrl', 'Insert a valid image URL').optional().isURL(),
        fieldValidation,
    ],
    updateItem
);

//Deletes a specific item from an user list
router.delete(
    '/user/:listType/:itemId',
    [
        validateJWT,
        validateUserListType,
        validateItemExists,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        fieldValidation,
    ],
    deleteItem
);
//Deletes a specific item from a household list
router.delete(
    '/household/:listType/:itemId',
    [
        validateJWT,
        validateHouseholdListType,
        validateItemExists,
        check('listType', 'Valid type is required').isIn([
            'shopping-list',
            'inventory',
            'wishlist',
        ]),
        fieldValidation,
    ],
    deleteItem
);
//TODO: Reactivate deleted items

//Gets items needed for a food recipe
router.get('/recipe-item', [], getRecipeItem);

module.exports = router;
