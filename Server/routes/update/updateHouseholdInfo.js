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

], updateHousehold);

//Updates a household's inventory
router.post('/h-inventory', [

], updateHouseholdInventory);

//Updates a household's shopping list
router.post('/h-shoppinglist', [

], updateHShoppingList);

//Updates a household's planned food recipes
router.post('/h-plannedrecipes', [

], updateHPlannedRecipes);

//Updates a household's nutrition goals
router.post('/h-nutritiongoals', [

], updateHNutritionGoals);

module.exports = router;