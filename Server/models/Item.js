const { Schema, model } = require("mongoose");

function arrayMin(array) {
    return array.lenght > 0;
};

const ItemSchema = Schema({
    name: {
        type: String,
        required: true
    },
    edible: {
        type: Boolean,
        required: true
    },
    category: {
        type: [String],
        validate: [arrayMin, '{PATH} must have at least 1 value'],
    },
    purchaseDate: {
        type: Date
    },
    currentAmmount: {
        type: Number,
        min: -1
    },
    boughtAmmount: {
        type: Number,
        min: 0
    },
    unit: {
        type: String,
        required: true
    },
    lowLevel: {
        type: Number,
        default: 40,
        min: 0,
        max: 100
    },
    cost:{
        type: Number,
        min: 0
    }
});

const edibleSchema = Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: "Item"
    },
    finishBy: {
        type: Date
    },
    nutritionProperties: {
        type: Schema.Types.ObjectId,
        ref: "NutritionProperties"
    }
});

const Item = model("Item", ItemSchema);
const Edible = model("Edible", edibleSchema);

module.exports = {
    Item,
    Edible
};