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
        ref: 'User',
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

inventorySchema.methods.toJSON = function () {
    const { __v, _id, ...inventory } = this.toObject();
    inventory.uid = _id;
    return inventory;
};
shoppingListSchema.methods.toJSON = function () {
    const { __v, _id, ...shoppingList } = this.toObject();
    shoppingList.uid = _id;
    return shoppingList;
};
wishlistSchema.methods.toJSON = function () {
    const { __v, _id, ...wishList } = this.toObject();
    wishList.uid = _id;
    return wishList;
};

const Inventory = model('Inventory', inventorySchema);
const ShoppingList = model('ShoppingList', shoppingListSchema);
const Wishlist = model('Wishlist', wishlistSchema);

module.exports = {
    Inventory,
    ShoppingList,
    Wishlist,
};
