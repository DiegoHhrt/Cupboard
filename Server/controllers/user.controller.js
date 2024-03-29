const bcrypt = require('bcryptjs');
const { User } = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const getUser = async (req, resp) => {
    try {
        const user = req.authUser;

        resp.json({
            ok: true,
            user,
        });
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
    const { limit = 10, from = 0 } = req.query;
    const lim = isNaN(Number(limit)) ? 10 : limit;
    const skip = isNaN(Number(from)) ? 0 : from;
    try {
        //TODO: Validate not showing false status items
        const list = req.list;
        //Trim items to the limit and skip the first items
        list.items = list.items.slice(skip, skip + lim);

        resp.json({
            ok: true,
            listType,
            list,
        });
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
    const { id } = req.authUser;
    const { _id, household, shoppingList, inventory, wishList, status, ...body } = req.body;
    try {
        if (body.password) {
            const salt = bcrypt.genSaltSync();
            body.password = bcrypt.hashSync(body.password, salt);
        }
        const dbUser = await User.findByIdAndUpdate(id, body, { new: true });

        resp.status(200).json({
            ok: true,
            user: dbUser,
        });
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
const deleteUser = async (req, resp) => {
    // TODO: Delete all user lists and items
    // TODO: remove user from household admin list and replace with another admin if possible
    const { id } = req.authUser;
    try {
        const dbUser = await User.findByIdAndUpdate(id, { status: false });

        resp.status(200).json({
            ok: true,
            user: dbUser,
        });
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
    getUserList,
    updateUser,
    deleteUser,
};
