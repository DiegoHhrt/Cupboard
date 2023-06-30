const Household = require('./Household');
const Item = require('./Item');
const List = require('./Lists');
const Nutrition = require('./Nutrition');
const User = require('./User');
const Category = require('./Category');

module.exports = {
    ...Household,
    ...Item,
    ...List,
    ...Nutrition,
    User,
    Category,
};
