const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

CategorySchema.methods.toJSON = function () {
    const { __v, status, ...category } = this.toObject();
    return category;
};

module.exports = model('Category', CategorySchema);
