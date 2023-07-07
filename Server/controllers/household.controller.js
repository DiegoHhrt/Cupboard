const {
    Household,
    User,
    NutritionGoals,
    PlannedFood,
    Inventory,
    ShoppingList,
} = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const downgradeAminToMember = async (req, resp) => {
    const { household: householdId } = req.authUser;
    const { userId } = req.body;
    try {
        const dbUser = await User.findById(userId);
        if (!dbUser.household.equals(householdId)) {
            return resp.status(400).json({
                ok: false,
                msg: 'The user is not part of your household',
            });
        }
        const household = await Household.findById(householdId);
        if (!household.admins.includes(userId)) {
            return resp.status(400).json({
                ok: false,
                msg: 'The user is not an admin',
            });
        }
        household.admins = household.admins.filter((admin) => !admin.equals(userId));
        await household.save();

        resp.status(200).json({
            ok: true,
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
const getHousehold = async (req, resp) => {
    const { household: householdId } = req.authUser;
    try {
        const household = await Household.findById(householdId)
            .populate('members', 'name -_id')
            .populate('admins', 'name -_id');

        resp.status(200).json({
            ok: true,
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
const getHouseholdList = async (req, resp) => {
    const { limit = 10, from = 0 } = req.query;
    const { listType } = req.params;
    const lim = isNaN(Number(limit)) ? 10 : limit;
    const skip = isNaN(Number(from)) ? 0 : from;
    try {
        let list = req.list;
        //Trim items to the limit and skip the first items
        if (listType !== 'planned-foods') list.items = list.items.slice(skip, skip + lim);
        else list = list.slice(skip, skip + lim);
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
const joinUserToHousehold = async (req, resp) => {
    const { household: householdId } = req.authUser;
    const { userId } = req.body;
    try {
        const dbUser = await User.findByIdAndUpdate(
            userId,
            { household: householdId },
            { new: true }
        );
        const household = await Household.findByIdAndUpdate(
            householdId,
            { $push: { members: req.body.userId } },
            { new: true }
        );

        resp.status(200).json({
            ok: true,
            household,
            dbUser,
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
const removeUserFromHousehold = async (req, resp) => {
    const { household: householdId } = req.authUser;
    const { newAdminId, userId } = req.body;
    try {
        let household = null;
        if (userId === req.authUser.id) {
            household = await Household.findById(householdId);
            if (household.admins.length === 1 && household.members.length === 1) {
                await Household.findByIdAndDelete(householdId);
                await NutritionGoals.findOneAndDelete({ householdId });
                await Inventory.findOneAndDelete({ ownerId: householdId });
                await ShoppingList.findOneAndDelete({ ownerId: householdId });

                household = 'deleted';
            } else if (household.admins.length === 1 && !newAdminId) {
                return resp.status(400).json({
                    ok: false,
                    msg: 'You need to specify a new admin, please use the newAdminId field in the request body',
                });
            }
            if (household !== 'deleted') {
                household = await Household.findByIdAndUpdate(
                    householdId,
                    {
                        $pull: { members: userId },
                        $pull: { admins: userId },
                        $push: { admins: newAdminId },
                        $push: { members: newAdminId },
                    },
                    { new: true }
                );
            }
        } else {
            household = await Household.findById(householdId);
            if (household.admins.includes(userId)) {
                return resp.status(403).json({
                    ok: false,
                    msg: 'You cannot delete another admin from your household',
                });
            }
            household = await Household.findByIdAndUpdate(
                householdId,
                { $pull: { members: userId } },
                { new: true }
            );
        }
        const dbUser = await User.findByIdAndUpdate(
            userId,
            { household: null },
            { new: true }
        );

        resp.status(200).json({
            ok: true,
            household,
            dbUser,
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
const updateHousehold = async (req, resp) => {
    const { name, lowLevel, currency, budget } = req.body;
    const { household: householdId } = req.authUser;
    try {
        const household = await Household.findByIdAndUpdate(
            householdId,
            { name, lowLevel, currency, budget },
            { new: true }
        );
        resp.status(200).json({
            ok: true,
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
const updatePlannedRecipes = async (req, resp) => {
    const { household: householdId } = req.authUser;
    const { ingredients, nutritionProperties, ...body } = req.body;
    try {
        const household = await Household.findById(householdId);
        const plannedFood = new PlannedFood(body);

        household.plannedFoods.push(plannedFood);
        await household.save();

        resp.status(200).json({
            ok: true,
            plannedFoods: household.plannedFoods,
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
const updateNutritionGoals = async (req, resp) => {
    const { household: householdId } = req.authUser;
    const { animalProductBalance, vegetalProductBalance, ...body } = req.body;
    try {
        const household = await Household.findById(householdId);
        if (!household.nutritionGoals) {
            return resp.status(400).json({
                ok: false,
                msg: 'You need to create household nutrition goals first',
            });
        }
        const nutritionGoals = await NutritionGoals.findByIdAndUpdate(
            household.nutritionGoals,
            body,
            { new: true }
        );

        resp.status(200).json({
            ok: true,
            nutritionGoals,
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
const upgradeUserToAdmin = async (req, resp) => {
    const { household: householdId } = req.authUser;
    const { userId } = req.body;
    try {
        const dbUser = await User.findById(userId);
        if (!dbUser.household.equals(householdId)) {
            return resp.status(400).json({
                ok: false,
                msg: 'The user is not part of your household',
            });
        }
        const household = await Household.findById(householdId);
        if (household.admins.includes(userId)) {
            return resp.status(400).json({
                ok: false,
                msg: 'The user is already an admin',
            });
        }
        household.admins.push(userId);
        await household.save();

        resp.status(200).json({
            ok: true,
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

module.exports = {
    downgradeAminToMember,
    getHousehold,
    getHouseholdList,
    joinUserToHousehold,
    removeUserFromHousehold,
    updateHousehold,
    updateNutritionGoals,
    updatePlannedRecipes,
    upgradeUserToAdmin,
};
