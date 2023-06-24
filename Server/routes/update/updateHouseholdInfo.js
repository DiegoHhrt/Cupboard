const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const {
    updateHousehold,
    updateHouseholdInventory,
    updateHShoppingList,
    updateHPlannedRecipes,
    updateHNutritionGoals
} = require('../../controllers/update/updateHouseholdInfo');

const router = Router();

//Updates a household's information
router.post('/household', [
    check('householdId', 'Household ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('field', 'Valid field is required').not().isEmpty(),
    check('value', 'Valid value is required').not().isEmpty(),
    fieldValidation
], updateHousehold);

//Updates a household's inventory history
router.post('/h-inventory', [
    check('itemId', 'Item ID is required').isMongoId(),
    check('requestorId', 'Requestor ID is required').isMongoId(),
    check('listId', 'List ID is required').isMongoId(),
    check('action', 'Valid action is required').isIn(['remove']),
    fieldValidation
], updateHouseholdInventory);

//Updates a household's planned food recipes
router.post('/h-plannedrecipes', [
    fieldValidation
], updateHPlannedRecipes);

//Updates a household's nutrition goals
router.post('/h-nutritiongoals', [
    fieldValidation
], updateHNutritionGoals);

module.exports = router;