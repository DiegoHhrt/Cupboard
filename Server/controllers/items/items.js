const{response} = require('express');
const{request}=require('express');

const createItem = async(req = request, resp = response) => {
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

const updateItem = async(req = request, resp = response) => {
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

const getItem = async(req = request, resp = response) => {
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

const getItems = async(req = request, resp = response) => {
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

const deleteItem = async(req = request, resp = response) => {
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
    createItem,
    updateItem,
    getItem,
    getItems,
    deleteItem
};