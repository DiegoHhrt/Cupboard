const { Inventory, ShoppingList, Wishlist, Household } = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 * @param {import('express').NextFunction} next
 */
const householdAdminValidation = async (req, resp, next) => {
    if (!req.authUser) {
        return resp.status(400).json({
            ok: false,
            msg: 'Trying to validate without a valid token',
        });
    }
    try {
        if (!req.authUser.household) {
            return resp.status(400).json({
                ok: false,
                msg: 'User does not belong to a household',
            });
        }

        const household = await Household.findById(req.authUser.household);
        if (!household) {
            return resp.status(400).json({
                ok: false,
                msg: 'The household does not exist',
            });
        }

        if (!household.members.includes(req.authUser.id)) {
            return resp.status(500).json({
                ok: false,
                msg: 'User is not properly linked to the household. Please contact the administrator',
            });
        }
        if (!household.admins.includes(req.authUser.id)) {
            return resp.status(403).json({
                ok: false,
                msg: 'User is not an admin of the household',
            });
        }

        next();
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
 * @param {import('express').NextFunction} next
 */
const validateUserListType = async (req, resp, next) => {
    const { limit = 10, from = 0 } = req.query;
    const lim = isNaN(Number(limit)) ? 10 : limit;
    const skip = isNaN(Number(from)) ? 0 : from;
    const { listType } = req.params;
    const user = req.authUser;
    try {
        let list;
        //Get list according to list type
        if (listType === 'inventory') {
            list = await Inventory.findOne({ ownerId: user.id })
                .populate('ownerId', 'name')
                .populate('items', 'name')
                .populate('history', 'name');
            //Trim history items to the limit and skip the first items
            if (list) list.history = list.history.slice(skip, skip + lim);
        } else if (listType === 'shopping-list') {
            list = await ShoppingList.findOne({ ownerId: user.id })
                .populate('ownerId', 'name')
                .populate('items', 'name');
        } else if (listType === 'wishlist') {
            list = await Wishlist.findOne({ ownerId: user.id })
                .populate('ownerId', 'name')
                .populate('items', 'name');
        } else {
            return resp.status(400).json({
                ok: false,
                msg: 'Invalid list type',
            });
        }

        if (!list) {
            return resp.status(500).json({
                ok: false,
                msg: `User is not correctly linked to the ${listType}. Please contact admin`,
            });
        }

        req.list = list;

        next();
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
 * @param {import('express').NextFunction} next
 */
const validateUserIsActive = (req, resp, next) => {
    try {
        if (!req.authUser.status) {
            return resp.status(403).json({
                ok: false,
                msg: 'User is not active',
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

module.exports = { householdAdminValidation, validateUserListType, validateUserIsActive };
