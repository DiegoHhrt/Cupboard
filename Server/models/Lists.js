const { Schema, model } = require("mongoose");

const inventorySchema = Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        refPath: "ownedBy",
        required: true
    },
    ownedBy: {
        type: String,
        enum: ["Household", "User"],
        required: true
    },
    items:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Item"
        }]
    },
    history:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Item"
        }]
    }
});

const shoppingListSchema = Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        refPath: "ownedBy",
        required: true
    },
    ownedBy: {
        type: String,
        enum: ["Household", "User"],
        required: true
    },
    items:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Item"
        }]
    },
    totalCost: {
        type: Number,
        min: 0,
        default: 0
    }
});

const wishlistSchema = Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        refPath: "User",
        required: true
    },
    items:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Item"
        }]
    }
});


const Inventory = model("Inventory", inventorySchema);
const ShoppingList = model("ShoppingList", shoppingListSchema);
const Wishlist = model("Wishlist", wishlistSchema);

module.exports = {
    Inventory,
    ShoppingList,
    Wishlist,
};