const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/fieldValidation');

const router = Router();

//Gets a household's information
router.get('/household', [

], getHousehold);

//Gets a household's inventory
router.get('/h-inventory', [

], getHouseholdInventory);

//Gets a household's shopping list
router.get('/h-shoppinglist', [

], getHShoppingList);

//Gets a household's planned food recipes
router.get('/h-plannedrecipes', [

], getHPlannedRecipes);

//Gets a household's nutrition goals
router.get('/h-nutritiongoals', [

], getHNutritionGoals);

module.exports = router;