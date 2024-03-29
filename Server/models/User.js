const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        minlenght: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    household: {
        type: Schema.Types.ObjectId,
        ref: 'Household',
    },
    shoppingList: {
        type: Schema.Types.ObjectId,
        ref: 'ShoppingList',
    },
    inventory: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
    },
    wishList: {
        type: Schema.Types.ObjectId,
        ref: 'WishList',
    },
    budget: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, status, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model('User', UserSchema);
