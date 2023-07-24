const authControllers = require('./auth.controller');
const householdControllers = require('./household.controller');
const listItemsControllers = require('./list-items.controller');
const userControllers = require('./user.controller');
const searchControllers = require('./search.controller');

module.exports = {
    ...authControllers,
    ...householdControllers,
    ...listItemsControllers,
    ...userControllers,
    ...searchControllers,
};
