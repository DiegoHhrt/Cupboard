const { Router } = require('express');
const { check } = require('express-validator');
const {
    updateHNutritionGoals,
    updateHousehold,
    updateHouseholdInventory,
    updateHPlannedRecipes,
    getHousehold,
    getHouseholdInventory,
    getHShoppingList,
    getHPlannedRecipes,
    getHNutritionGoals,
} = require('../controllers');
const { fieldValidation } = require('../middlewares');

const router = Router();

//Gets a household's information
router.get('/household', [], getHousehold);

//TODO: simplify by using params in a single request

//Gets a household's inventory
router.get('/h-inventory', [], getHouseholdInventory);

//Gets a household's shopping list
router.get('/h-shoppinglist', [], getHShoppingList);

//Gets a household's planned food recipes
router.get('/h-plannedrecipes', [], getHPlannedRecipes);

//Gets a household's nutrition goals
router.get('/h-nutritiongoals', [], getHNutritionGoals);

//Updates a household's information
router.post(
    '/household',
    [
        check('householdId', 'Household ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('field', 'Valid field is required').not().isEmpty(),
        check('value', 'Valid value is required').not().isEmpty(),
        fieldValidation,
    ],
    updateHousehold
);

//Updates a household's inventory history
router.post(
    '/h-inventory',
    [
        check('itemId', 'Item ID is required').isMongoId(),
        check('requestorId', 'Requestor ID is required').isMongoId(),
        check('listId', 'List ID is required').isMongoId(),
        check('action', 'Valid action is required').isIn(['remove']),
        fieldValidation,
    ],
    updateHouseholdInventory
);
//TODO: simplify by using params in a single request
//Updates a household's planned food recipes
router.post('/h-plannedrecipes', [fieldValidation], updateHPlannedRecipes);

//Updates a household's nutrition goals
router.post('/h-nutritiongoals', [fieldValidation], updateHNutritionGoals);

module.exports = router;
