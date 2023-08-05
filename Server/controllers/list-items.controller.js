const { Item } = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const createListItem = async (req, resp) => {
    //TODO: Implement recycling of deleted items
    //TODO: Implement category creation in db
    const { status, ...info } = req.body;
    const { listType } = req.params;
    const list = req.list;
    try {
        //Creates the item
        const item = new Item(info);

        //saves item to list
        if (list.items) {
            list.items.push(item);
            // //Adds item to history if it was added to the inventory
            if (listType === 'inventory') {
                list.history.push(item);
            }
            //Adds cost of the item to the total cost of the list if it's added to the shopping list
            if (listType === 'shopping-list') {
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
const createListEdibleItem = async (req, resp) => {
    return resp.status(500).json({
        ok: false,
        msg: 'Not implemented',
    });
};

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
    const { status, ...body } = req.body;
    const { listType } = req.params;
    const item = req.item;
    const list = req.list;
    try {
        const arrayItem = new Item(item);
        arrayItem.$set(body);

        //Updates item in list
        const index = list.items.findIndex((item) => arrayItem._id.equals(item._id));
        list.items[index] = arrayItem;

        //Updates item in history if it was updated in the inventory
        if (listType === 'inventory') {
            const index = list.history.findIndex((historyItem) =>
                historyItem._id.equals(arrayItem._id)
            );
            list.history[index] = arrayItem;
        }
        //Updates the total cost of the shopping list if the item cost is updated
        if (listType === 'shopping-list' && body.cost >= 0) {
            if (!item.cost) item.cost = 0;
            list.totalCost -= item.cost;
            list.totalCost += body.cost;
        }

        await list.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Item updated',
            item: arrayItem,
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
    const item = req.item;
    try {
        return resp.status(200).json({
            ok: true,
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
const getItems = (req, resp) => {
    const { limit = 10, from = 0 } = req.query;
    const { listType } = req.params;
    const lim = isNaN(Number(limit)) ? 10 : limit;
    const skip = isNaN(Number(from)) ? 0 : from;
    let list = req.list;
    try {
        list = list.items.filter((item) => item.status === true);
        list = list.slice(skip, skip + lim);

        resp.status(200).json({
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
const deleteItem = async (req, resp) => {
    const { listType } = req.params;
    const item = req.item;
    const list = req.list;
    try {
        //An item is hard deleted if it belong to an inventory since history field exists
        if (listType === 'inventory') {
            const index = list.items.findIndex((storedItem) =>
                storedItem._id.equals(item._id)
            );
            list.items.splice(index, 1);
        }
        //An item is hard deleted if the list type is the history
        if (listType === 'history') {
            //TODO: implement correctly after validation handling
            const index = list.history.findIndex((storedItem) =>
                storedItem._id.equals(item._id)
            );
            list.history.splice(index, 1);
        }
        //An item is soft deleted if it belongs to the shopping list or wishlist since history field doesn't exist
        if (listType === 'shopping-list' || listType === 'wishlist') {
            const arrayItem = new Item(item);
            arrayItem.$set({ status: false });
            const index = list.items.findIndex((storedItem) =>
                storedItem._id.equals(item._id)
            );

            list.items[index] = arrayItem;
            if (listType === 'shopping-list') {
                if (!item.cost) item.cost = 0;
                list.totalCost -= item.cost;
            }
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
    getItem,
    getRecipeItem,
    updateItem,
    getItems,
};
