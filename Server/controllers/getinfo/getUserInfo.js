const { response } = require('express');
const { request } = require('express');

const getUser = async (req = request, resp = response) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

const getUserInventory = async (req = request, resp = response) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

const getUShoppingList = async (req = request, resp = response) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

const getUWishlist = async (req = request, resp = response) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

module.exports = {
    getUser,
    getUserInventory,
    getUShoppingList,
    getUWishlist,
};
