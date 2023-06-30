const bcrypt = require('bcryptjs');
const { newJWt } = require('../helpers/jwt');
const {
    Household,
    Inventory,
    NutritionGoals,
    ShoppingList,
    User,
    Wishlist,
} = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const newUser = async (req, resp) => {
    const { household, shoppingList, inventory, wishList, ...body } = req.body;

    try {
        //Create user with model
        const dbUser = new User(body);
        //Password hash
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(body.password, salt);
        //shopping list object creation on document
        const shoppingList = new ShoppingList({ ownerId: dbUser.id, ownedBy: 'User' });
        dbUser.shoppingList = shoppingList.id;
        //inventory object creation on document
        const inventory = new Inventory({ ownerId: dbUser.id, ownedBy: 'User' });
        dbUser.inventory = inventory.id;
        //wishlist object creation on document
        const wishList = new Wishlist({ ownerId: dbUser.id, ownedBy: 'User' });
        dbUser.wishList = wishList.id;
        //Json webToken generation
        const token = await newJWt(dbUser.id, dbUser.userName);
        //Create user and auxiliary documents on db
        await Promise.all([
            dbUser.save(),
            shoppingList.save(),
            inventory.save(),
            wishList.save(),
        ]);
        //Successful response
        return resp.status(201).json({
            ok: true,
            uid: dbUser.id,
            token,
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
const userLogin = async (req, resp) => {
    const { email, password } = req.body;
    try {
        const dbUser = await User.findOne({ email });
        //Confirm matching password
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if (!validPassword || !dbUser.status) {
            return resp.status(400).json({
                ok: false,
                msg: 'Mail and password do not match to existing user',
            });
        }
        //new jwt
        const token = await newJWt(dbUser.id, dbUser.userName);

        resp.status(200).json({
            ok: true,
            uid: dbUser.id,
            token,
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
const createHousehold = async (req, resp) => {
    const { admins, members, shoppingList, inventory, ...data } = req.body;
    const user = req.authUser;
    const info = {
        ...data,
        admins: [user.id],
        members: [user.id],
    };
    try {
        //Create household and auxiliary objects with model
        const household = new Household(info);
        const shoppingList = new ShoppingList({
            ownedBy: 'Household',
            ownerId: household.id,
        });
        const inventory = new Inventory({
            ownedBy: 'Household',
            ownerId: household.id,
        });

        household.shoppingList = shoppingList.id;
        household.inventory = inventory.id;
        //Update user with household id
        user.household = household.id;
        //Save household and auxiliary documents on db
        await Promise.all([
            household.save(),
            shoppingList.save(),
            inventory.save(),
            user.save(),
        ]);

        //Response
        return resp.status(201).json({
            ok: true,
            household: household.name,
            user: user.userName,
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
const createNutritionGoals = async (req, resp) => {
    const { householdId, requestorId } = req.body;
    const { animalProductBalance, vegetalProductBalance, ...info } = req.body;
    try {
        const household = await Household.findById(householdId);
        //Verifies if user is a household admin
        if (!household.admins.includes(requestorId)) {
            return resp.status(403).json({
                ok: false,
                msg: 'User is not an admin of the household',
            });
        }

        //Create nutrition goals and assigns to household
        const nutritionGoals = new NutritionGoals(info);
        household.nutritionGoals = nutritionGoals.id;
        await Promise.all([household.save(), nutritionGoals.save()]);

        //Response
        return resp.status(201).json({
            ok: true,
            nutritionGoals,
            household,
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
const tokenRenew = async (req, resp) => {
    const { uid } = req;

    //read db to get email
    const dbUser = await User.findById(uid);

    const token = await newJWt(uid, dbUser.userName);

    return resp.json({
        ok: true,
        uid,
        userName: dbUser.userName,
        email: dbUser.email,
        token,
    });
};

module.exports = {
    createHousehold,
    createNutritionGoals,
    newUser,
    tokenRenew,
    userLogin,
};
