const dbValidators = require('./db-validators');
const filter = require('./filter');
const jwt = require('./jwt');

const mailExp = new RegExp(/^[( \w \. \-)]{4,20}@((g|hot)mail|outlook|live).com$/);

module.exports = {
    mailExp,
    ...dbValidators,
    ...filter,
    ...jwt,
};
