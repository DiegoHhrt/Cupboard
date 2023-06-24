const authControllers = require('./auth.controller');
const householdControllers = require('./household.controller');
const listItemsControllers = require('./list-items.controller');
const userControllers = require('./user.controller');

module.exports = {
    ...authControllers,
    ...householdControllers,
    ...listItemsControllers,
    ...userControllers,
};
