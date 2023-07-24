const { Item, Inventory, ShoppingList, Wishlist } = require('../models');
/**
 *
 * @param {String} term
 * @param {Inventory | ShoppingList | Wishlist} list
 * @returns {Item[]}
 */
const searchName = (term, list) => {
    try {
        let itemArr = list.items;
        itemArr = itemArr.map((item) => {
            if (item.name.includes(term)) return item;
        });
        //Strips undefined values
        const items = itemArr.filter((item) => item);
        return items;
    } catch (error) {
        console.log(error);
        throw new Error('Please contact admin');
    }
};

/**
 *
 * @param {Number} term
 * @param {Inventory | ShoppingList | Wishlist} list
 * @returns {Item[]}
 */
const searchDate = (term, list) => {
    try {
        let itemArr = list.items;
        itemArr = itemArr.map((item) => {
            if (item.purchaseDate?.toString().slice(0, 16).includes(term)) {
                return item;
            }
        });
        // //Strips undefined values
        const items = itemArr.filter((item) => item);

        return items;
    } catch (error) {
        console.log(error);
        throw new Error('Please contact admin');
    }
};

/**
 *
 * @param {String} term
 * @param {Inventory | ShoppingList | Wishlist} list
 * @returns {Item[]}
 */
const searchUnit = (term, list) => {
    try {
        let itemArr = list.items;
        const unitArr = ['kg', 'g', 'l', 'ml', 'pz', 'oz']; //TODO: Implement unit model
        itemArr = itemArr.map((item) => {
            if (item.unit === term) return item;
        });
        //Strips undefined values
        const items = itemArr.filter((item) => item);
        return items;
    } catch (error) {
        console.log(error);
        throw new Error('Please contact admin');
    }
};

/**
 *
 * @param {String} field
 * @param {Number} term
 * @param {Inventory | ShoppingList | Wishlist} list
 * @param {Number} minAmount
 * @param {Number} maxAmount
 * @returns {Item[]}
 */
const searchQuantity = (field, term, list, minAmount = -1, maxAmount = -1) => {
    try {
        let itemArr = list.items;
        let results = [];
        term = Number(term);
        if (field === 'currentAmount') {
            itemArr.forEach((item) => {
                const results = [];
                if (item.currentAmmount === term) results.push(item);
                if (minAmount > -1 || maxAmount > -1) {
                    if (maxAmount === -1) maxAmount = 100000;
                    if (
                        item.currentAmmount >= minAmount &&
                        item.currentAmmount <= maxAmount &&
                        !results.includes(item)
                    )
                        results.push(item);
                }
            });
        }
        if (field === 'boughtAmount') {
            results = [];
            itemArr.forEach((item) => {
                if (item.boughtAmmount === term) results.push(item);
                if (minAmount > -1 || maxAmount > -1) {
                    if (maxAmount === -1) maxAmount = 100000;
                    if (
                        item.boughtAmmount >= minAmount &&
                        item.boughtAmmount <= maxAmount &&
                        !results.includes(item)
                    )
                        results.push(item);
                }
            });
        }
        if (field === 'lowLevel') {
            results = [];
            itemArr.forEach((item) => {
                if (item.lowLevel === term) results.push(item);
                if (minAmount > -1 || maxAmount > -1) {
                    if (maxAmount === -1) maxAmount = 100000;
                    if (
                        item.lowLevel >= minAmount &&
                        item.lowLevel <= maxAmount &&
                        !results.includes(item)
                    )
                        results.push(item);
                }
            });
        }
        if (field === 'cost') {
            results = [];
            itemArr.forEach((item) => {
                if (item.cost === term) results.push(item);
                if (minAmount > -1 || maxAmount > -1) {
                    if (maxAmount === -1) maxAmount = 100000;
                    if (
                        item.cost >= minAmount &&
                        item.cost <= maxAmount &&
                        !results.includes(item)
                    )
                        results.push(item);
                }
            });
        }

        //Strips undefined values
        const items = results.filter((item) => item);
        return items;
    } catch (error) {
        console.log(error);
        throw new Error('Please contact admin');
    }
};

/**
 *
 * @param {Array<String>} terms
 * @param {Inventory | ShoppingList | Wishlist} list
 * @returns {Item[]}
 */
const searchCategory = (terms, list) => {
    try {
        let itemArr = list.items;
        itemArr = itemArr.map((item) => {
            for (const term of terms) {
                if (item.category.includes(term)) return item;
            }
        });
        //Strips undefined values
        const items = itemArr.filter((item) => item);

        return items;
    } catch (error) {
        console.log(error);
        throw new Error('Please contact admin');
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const searchUserItem = async (req, res) => {
    const { listType } = req.params;
    const list = req.list;
    const {
        name,
        category,
        purchaseDate,
        currentAmmount,
        boughtAmmount,
        minAmount,
        maxAmount,
        unit,
        lowLevel,
        cost,
    } = req.query;
    try {
        //TODO: Make it so in case there's multiple fields, it returns the intersection of all results
        let results = [];
        if (name) {
            results = results.concat(searchName(name, list));
        }
        if (unit) {
            results = results.concat(searchUnit(unit, list));
        }
        if (category) {
            let categories = category;
            if (!category.values) categories = [category];
            results = results.concat(searchCategory(categories, list));
        }
        if (purchaseDate) {
            results = results.concat(searchDate(purchaseDate, list));
        }
        if (currentAmmount) {
            results = results.concat(
                searchQuantity('currentAmount', currentAmmount, list, minAmount, maxAmount)
            );
        }
        if (boughtAmmount) {
            results = results.concat(
                searchQuantity('boughtAmount', boughtAmmount, list, minAmount, maxAmount)
            );
        }
        if (lowLevel) {
            results = results.concat(
                searchQuantity('lowLevel', lowLevel, list, minAmount, maxAmount)
            );
        }
        if (cost) {
            results = results.concat(searchQuantity('cost', cost, list, minAmount, maxAmount));
        }
        //Strips duplicated values
        results = results.filter((item, index, self) => {
            return index === self.findIndex((t) => t._id.toString() === item._id.toString());
        });

        res.status(200).json({
            ok: true,
            results,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const searchHouseholdItem = async (req, res) => {
    try {
        res.status(200).json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact admin',
        });
    }
};

module.exports = {
    searchUserItem,
    searchHouseholdItem,
};
