/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const getUser = async (req, resp) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const getUserInventory = async (req, resp) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const getUShoppingList = async (req, resp) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const getUWishlist = async (req, resp) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const updateUser = async (req, resp) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const updateUserInventory = async (req, resp) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const updateUShoppingList = async (req, resp) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const updateUWishlist = async (req, resp) => {
    try {
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const editUserHousehold = async (req, resp) => {
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
    editUserHousehold,
    getUser,
    getUserInventory,
    getUShoppingList,
    getUWishlist,
    updateUser,
    updateUserInventory,
    updateUShoppingList,
    updateUWishlist,
};
