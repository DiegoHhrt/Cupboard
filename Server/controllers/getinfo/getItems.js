const{response} = require('express');
const{request}=require('express');

const getSLItem = async(req = request, resp = response) => {
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

const getInventoryItem = async(req = request, resp = response) => {
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

const getWishlistItem = async(req = request, resp = response) => {
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

const getRecipeItem = async(req = request, resp = response) => {
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
    getSLItem,
    getInventoryItem,
    getWishlistItem,
    getRecipeItem
};