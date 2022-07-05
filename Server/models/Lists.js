const { Schema, model } = require("mongoose");

const inventorySchema = Schema({
    ownedBy: {
        type: String,
        enum: ["household", "user"],
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
    ownedBy: {
        type: String,
        enum: ["household", "user"],
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
    ownedBy: {
        type: String,
        enum: ["household", "user"],
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