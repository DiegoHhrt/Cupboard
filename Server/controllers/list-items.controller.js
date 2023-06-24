const { ShoppingList, Inventory, Wishlist, Household, Item, User } = require('../models');

/**
 *
 * @param {*} listId
 * @param {*} requestorId
 * @param {import('express').Response} resp
 * @param {*} type
 * @returns
 */
const listValidation = async (listId, requestorId, resp, type) => {
    //Verifies if the list exists and the list type
    let list = {};
    if (type === 'SL') {
        list = await ShoppingList.findById(listId);
    } else if (type === 'I') {
        list = await Inventory.findById(listId);
    } else if (type === 'W') {
        list = await Wishlist.findById(listId);
    } else {
        return resp.status(400).json({
            ok: false,
            msg: 'Incorrect list type, contact admin',
        });
    }

    if (!list) {
        return resp.status(404).json({
            message: 'List does not exist',
        });
    }
    //Verifies if requestor user exists
    const reqUser = await User.findById(requestorId);
    if (!reqUser) {
        return resp.status(404).json({
            ok: false,
            msg: 'User not found',
        });
    }
    //Verifies if the list is owned by a household or a user
    if (list.ownedBy === 'Household') {
        const household = await Household.findById(list.ownerId);
        if (!household) {
            return resp.status(404).json({
                message: 'Household does not exist',
            });
        }
        //Verifies if the user is a member of the household
        if (!household.members.includes(requestorId)) {
            return resp.status(403).json({
                message: 'User is not a member of the household',
            });
        }
    } else if (list.ownedBy === 'User') {
        const user = await User.findById(list.ownerId);
        if (!user) {
            return resp.status(404).json({
                message: 'User does not exist',
            });
        }
        //Verifies if the user is the owner of the list
        if (user.id !== reqUser.id) {
            return resp.status(403).json({
                message: 'User is not the owner of the list',
            });
        }
    }

    return list;
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const createListItem = async (req, resp) => {
    //TODO: simplify data value extraction
    const {
        listId,
        requestorId,
        name,
        edible,
        category,
        purchaseDate,
        currentAmmount,
        boughtAmmount,
        unit,
        lowLevel,
        cost,
        imgUrl,
        listType,
    } = req.body;
    const info = {
        name,
        edible,
        category,
        purchaseDate,
        currentAmmount,
        boughtAmmount,
        unit,
        lowLevel,
        cost,
        imgUrl,
    };
    try {
        //Calls to validaion function to ensure everything is correct
        const list = await listValidation(listId, requestorId, resp, listType);

        //Creates the item
        const item = new Item(info);

        //saves item to list
        if (list.items) {
            list?.items.push(item);
            //Adds item to history if it was added to the inventory
            if (listType === 'I') {
                list?.history.push(item);
            }
            //Adds cost of the item to the total cost of the list if it's added to the shopping list
            if (listType === 'SL') {
                if (!item.cost) item.cost = 0;
                list.totalCost += item.cost;
            }
            await list.save();

            return resp.status(201).json({
                ok: true,
                msg: 'Item created',
                item,
            });
        } else {
            return resp.status(500).json({
                ok: false,
                msg: 'Something went wrong',
            });
        }
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
const createListEdibleItem = async (req, resp) => {};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const createRecipeItem = async (req, resp) => {
    const { listId } = req.body;
    const info = req.body;
    const listType = '';
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
const updateItem = async (req, resp) => {
    //TODO: simplify data value extraction
    const { listId, requestorId, field, value, isInListType, itemId } = req.body;
    try {
        //Calls to validaion function to ensure everything is correct
        const list = await listValidation(listId, requestorId, resp, isInListType);

        //Finds the item in the list
        const item = list.items.find((item) => item.id === itemId);
        if (!item) {
            return resp.status(404).json({
                ok: false,
                msg: 'Item not found',
            });
        }
        //Updates the item
        item[field] = value;
        //Updates item in history if it was updated in the inventory
        if (isInListType === 'I') {
            const historyItem = list.history.find((historyItem) => historyItem.id === itemId);
            historyItem[field] = value;
        }
        //Updates the total cost of the shopping list if the item cost is updated
        if (isInListType === 'SL' && field === 'cost') {
            list.totalCost -= item.cost;
            list.totalCost += value;
        }
        await list.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Item updated',
            item,
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
const getItem = async (req, resp) => {
    //TODO: simplify data value extraction
    const { listId, requestorId, itemId, isInListType } = req.body;
    try {
        //Calls to validaion function to ensure everything is correct
        const list = await listValidation(listId, requestorId, resp, isInListType);

        //Finds the item in the list
        const item = list.items.find((item) => item.id === itemId);
        if (!item) {
            return resp.status(404).json({
                ok: false,
                msg: 'Item not found',
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Item found',
            item,
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
const deleteItem = async (req, resp) => {
    //TODO: simplify data value extraction
    const { listId, requestorId, itemId, isInListType } = req.body;
    try {
        //Calls to validaion function to ensure everything is correct
        const list = await listValidation(listId, requestorId, resp, isInListType);

        //Finds the item in the list
        const item = list.items.find((item) => item.id === itemId);
        if (!item) {
            return resp.status(404).json({
                ok: false,
                msg: 'Item not found',
            });
        }
        //Deletes the item
        list.items = list.items.filter((item) => item.id !== itemId);
        //Updates the total cost of the shopping list if the item belongs to a shopping list
        if (isInListType === 'SL') {
            list.totalCost -= item.cost;
        }
        await list.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Item deleted',
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
const getSLItem = async (req, resp) => {
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
const getInventoryItem = async (req, resp) => {
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
const getWishlistItem = async (req, resp) => {
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
const getRecipeItem = async (req, resp) => {
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
    createListEdibleItem,
    createListItem,
    createRecipeItem,
    deleteItem,
    getInventoryItem,
    getItem,
    getRecipeItem,
    getSLItem,
    getWishlistItem,
    updateItem,
};
