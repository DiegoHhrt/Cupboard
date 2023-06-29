const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 * @param {import('express').NextFunction} next
 */
const validateJWT = async (req, resp, next) => {
    const token = req.header('x-token');
    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token is missing in request',
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        const authUser = await User.findById(uid);

        if (!authUser) {
            return resp.status(401).json({
                msg: 'Token is not valid',
            });
        }

        req.authUser = authUser;
        req.body.requestorId = authUser.id;
        next();
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Invalid token',
        });
    }
};

module.exports = {
    validateJWT,
};
