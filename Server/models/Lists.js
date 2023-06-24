const { Schema, model } = require('mongoose');
const { ItemSchema, edibleSchema } = require('./Item');

const inventorySchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        refPath: 'ownedBy',
        required: true,
    },
    ownedBy: {
        type: String,
        enum: ['Household', 'User'],
        required: true,
    },
    items: {
        type: [ItemSchema],
        default: [],
    },
    edibles: {
        type: [edibleSchema],
        default: [],
    },
    history: {
        type: [ItemSchema],
        default: [],
    },
});

const shoppingListSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        refPath: 'ownedBy',
        required: true,
    },
    ownedBy: {
        type: String,
        enum: ['Household', 'User'],
        required: true,
    },
    items: {
        type: [ItemSchema],
        default: [],
    },
    edibles: {
        type: [edibleSchema],
        default: [],
    },
    totalCost: {
        type: Number,
        min: 0,
        default: 0,
    },
});

const wishlistSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        refPath: 'User',
        required: true,
    },
    items: {
        type: [ItemSchema],
        default: [],
    },
    edibles: {
        type: [edibleSchema],
        default: [],
    },
});

const Inventory = model('Inventory', inventorySchema);
const ShoppingList = model('ShoppingList', shoppingListSchema);
const Wishlist = model('Wishlist', wishlistSchema);

module.exports = {
    Inventory,
    ShoppingList,
    Wishlist,
};
