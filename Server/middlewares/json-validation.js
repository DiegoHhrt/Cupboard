const { Item, NutritionProperties } = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 * @param {import('express').NextFunction} next
 */
const jsonValidation = async (req, resp, next) => {
    try {
        const item = req.body.itemInfo;
        const validatingItem = new Item(item);
        await validatingItem.validate();
    } catch (errors) {
        return resp.status(400).json({
            ok: false,
            msg: 'Invalid item information',
            errors,
        });
    }
    try {
        const nutrition = req.body.nutritionInfo;
        const validatingNutrition = new NutritionProperties(nutrition);
        await validatingNutrition.validate();
    } catch (errors) {
        return resp.status(400).json({
            ok: false,
            msg: 'Invalid nutrition information',
            errors,
        });
    }
    next();
};

module.exports = {
    jsonValidation,
};
