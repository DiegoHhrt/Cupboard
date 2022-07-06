const{response} = require('express');
const{request}=require('express');

const getHousehold = async(req = request, resp = response) => {
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

const getHouseholdInventory = async(req = request, resp = response) => {
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

const getHShoppingList = async(req = request, resp = response) => {
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

const getHPlannedRecipes = async(req = request, resp = response) => {
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

const getHNutritionGoals = async(req = request, resp = response) => {
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
    getHousehold,
    getHouseholdInventory,
    getHShoppingList,
    getHPlannedRecipes,
    getHNutritionGoals
};