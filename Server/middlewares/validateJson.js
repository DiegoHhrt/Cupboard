const {request, response} = require("express");
const {Item} = require('../models/Item');
const {NutritionProperties} = require('../models/Nutrition');

const jsonValidation = async (req=request, resp=response, next) => { 
    try {
        const item = req.body.itemInfo;
        const validatingItem = new Item(item);
        await validatingItem.validate();
    } catch (errors) {
        return resp.status(400).json({
            ok:false,
            msg: "Invalid item information",
            errors
        })
    }
    try {
        const nutrition = req.body.nutritionInfo;
        const validatingNutrition = new NutritionProperties(nutrition);
        await validatingNutrition.validate();
        
    } catch (errors) {
        return resp.status(400).json({
            ok:false,
            msg: "Invalid nutrition information",
            errors
        })
    }
    next();
}

module.exports={
    jsonValidation
}