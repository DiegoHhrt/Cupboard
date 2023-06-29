const { request, response } = require('express');
const { Household } = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 * @param {import('express').NextFunction} next
 */
const householdAdminValidation = async (req = request, resp = response, next) => {
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
    }
};

module.exports = { householdAdminValidation };
