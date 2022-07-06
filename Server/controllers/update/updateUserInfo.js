const{response} = require('express');
const{request}=require('express');

const updateUser = async(req = request, resp = response) => {
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

const updateUserInventory = async(req = request, resp = response) => {
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

const updateUShoppingList = async(req = request, resp = response) => {
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

const updateUWishlist = async(req = request, resp = response) => {
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
    updateUser,
    updateUserInventory,
    updateUShoppingList,
    updateUWishlist
};