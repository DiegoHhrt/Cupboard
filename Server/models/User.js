const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        minlenght: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    shoppingList: {
        type: Schema.Types.ObjectId,
        ref: "ShoppingList"
    },
    inventory: {
        type: Schema.Types.ObjectId,
        ref: "Inventory"
    },
    budget: {
        type: Number,
        default: 0
    }
});

module.exports = model('User', UserSchema);