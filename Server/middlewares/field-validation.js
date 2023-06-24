const { validationResult } = require('express-validator');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 * @param {import('express').NextFunction} next
 */
const fieldValidation = (req, resp, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    next();
};

module.exports = { fieldValidation };
