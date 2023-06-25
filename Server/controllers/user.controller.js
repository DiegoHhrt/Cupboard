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
const getUserList = async (req, resp) => {
    const { listType } = req.params;
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
    getUserList,
    updateUser,
    updateUserInventory,
    updateUShoppingList,
    updateUWishlist,
};
