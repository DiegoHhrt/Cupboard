const validateField = require('./field-validation');
const validateJson = require('./json-validation');
const validateJWT = require('./jwt-validation');
const validateRequestor = require('./request-validation');

module.exports = {
    ...validateField,
    ...validateJson,
    ...validateJWT,
    ...validateRequestor,
};
