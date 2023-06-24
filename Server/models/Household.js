const { Schema, model } = require('mongoose');

const HouseholdSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    shoppingList: {
        type: Schema.Types.ObjectId,
        ref: 'ShoppingList',
    },
    inventory: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
    },
    plannedFoods: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PlannedFood',
        },
    ],
    nutritionGoals: {
        type: Schema.Types.ObjectId,
        ref: 'NutritionGoals',
    },
    lowLevel: {
        type: Number,
        default: 40,
        min: 0,
        max: 100,
    },
    currency: {
        type: String,
        default: 'USD',
    },
    budget: {
        type: Number,
        default: 0,
    },
});

plannedFoodSchema = new Schema({
    name: {
        type: String,
    },
    ingredients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        },
    ],
    recipeLink: {
        type: String,
    },
    plannedDate: {
        type: Date,
    },
    nutritionProperties: {
        type: Schema.Types.ObjectId,
        ref: 'NutritionProperties',
    },
});

const Household = model('Household', HouseholdSchema);
const PlannedFood = model('PlannedFood', plannedFoodSchema);

module.exports = {
    Household,
    PlannedFood,
};
