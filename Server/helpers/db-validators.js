const { Category, Role, User, Product, Household } = require('../models');

/**
 *
 * @param {String} role
 */
const roleIsValid = async (role) => {
    const roleExists = await Role.findOne({ role });

    if (!roleExists) {
        throw new Error(`Role '${role}' is not recognized`);
    }
};

/**
 *
 * @param {String} email
 */
const emailExists = async (email) => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`Email: ${email} already has an account`);
    }
};

/**
 *
 * @param {String} id
 */
const userExistsById = async (id) => {
    const userExists = await User.findById(id);
    if (!userExists || !userExists.status) {
        throw new Error(`Id: ${id} doesn't exist`);
    }
};

// TODO: Migrate function to middlewares\request-validation.js
/**
 *
 * @param {String} id
 */
const userBelongsToHousehold = async (id) => {
    const user = await User.findById(id);
    const household = await Household.findOne({ members: id });
    if (!user?.household || !household) {
        throw new Error(`User: ${id} doesn't belong to a household`);
    }
    return true;
};
//TODO: find real use xd
/**
 *
 * @param {String} id
 */
const isHouseholdAdmin = async (id) => {
    const household = await Household.findOne({ admins: id });
    if (!household) {
        throw new Error(`User: ${id} is not a household's admin`);
    }
};

/**
 *
 * @param {String} id
 */
const householdExistsById = async (id) => {
    const householdExists = await Household.findById(id);
    if (!householdExists) {
        throw new Error(`Household Id: ${id} doesn't exist`);
    }
};
module.exports = {
    emailExists,
    householdExistsById,
    isHouseholdAdmin,
    roleIsValid,
    userBelongsToHousehold,
    userExistsById,
};
