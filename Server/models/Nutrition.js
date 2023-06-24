const { Schema, model } = require('mongoose');

//-1 sets no limit to the ammout on the field
const nutritionGoalsSchema = new Schema({
    householdId: {
        type: Schema.Types.ObjectId,
        ref: 'Household',
        required: true,
    },
    period: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly'],
    },
    startingDate: {
        type: Date,
        required: true,
    },
    totalPeriodCalories: {
        type: Number,
        min: -1,
        default: -1,
    },
    totalPeriodProtein: {
        type: Number,
        min: -1,
        default: -1,
    },
    totalPeriodCarbs: {
        type: Number,
        min: -1,
        default: -1,
    },
    totalPeriodFat: {
        type: Number,
        min: -1,
        default: -1,
    },
    totalPeriodFiber: {
        type: Number,
        min: -1,
        default: -1,
    },
    totalPeriodSugar: {
        type: Number,
        min: -1,
        default: -1,
    },
    totalPeriodSodium: {
        type: Number,
        min: -1,
        default: -1,
    },
    totalPeriodCholesterol: {
        type: Number,
        min: -1,
        default: -1,
    },
    animalProductBalance: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    vegetalProductBalance: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    animalBalanceGoal: {
        type: Number,
        min: 0,
        max: 100,
        default: 30,
    },
    vegetalBalanceGoal: {
        type: Number,
        min: 0,
        max: 100,
        default: 70,
    },
});

//-1 means no information avaliable for this field on the product
const nutritionPropertiesSchema = Schema({
    calories: {
        type: Number,
        min: -1,
        default: -1,
    },
    protein: {
        type: Number,
        min: -1,
        default: -1,
    },
    carbs: {
        type: Number,
        min: -1,
        default: -1,
    },
    fat: {
        type: Number,
        min: -1,
        default: -1,
    },
    fiber: {
        type: Number,
        min: -1,
        default: -1,
    },
    sugar: {
        type: Number,
        min: -1,
        default: -1,
    },
    sodium: {
        type: Number,
        min: -1,
        default: -1,
    },
    cholesterol: {
        type: Number,
        min: -1,
        default: -1,
    },
    scale: {
        // The multiplier for the nutrition properties per quantity
        type: Number,
        min: 0,
        max: 1,
        default: 0,
        required: true,
    },
    scalePortion: {
        // The ammout of food to wich the scale applies
        type: Number,
        min: 0,
        default: 100,
    },
});

const NutritionGoals = model('NutritionGoals', nutritionGoalsSchema);
const NutritionProperties = model('NutritionProperties', nutritionPropertiesSchema);

module.exports = {
    NutritionGoals,
    NutritionProperties,
};
