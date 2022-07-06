const{response} = require('express');
const{request}=require('express');

const updateHousehold = async(req = request, resp = response) => {
    try {
        
    } 
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });
    }
};

const updateHouseholdInventory = async(req = request, resp = response) => {
    try {
        
    } 
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });
    }
};

const updateHShoppingList = async(req = request, resp = response) => {
    try {
        
    } 
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });
    }
};

const updateHPlannedRecipes = async(req = request, resp = response) => {
    try {
        
    } 
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });
    }
};

const updateHNutritionGoals = async(req = request, resp = response) => {
    try {
        
    } 
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });
    }
};


module.exports={
    updateHousehold,
    updateHouseholdInventory,
    updateHShoppingList,
    updateHPlannedRecipes,
    updateHNutritionGoals
};