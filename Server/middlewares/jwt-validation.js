const jwt = require('jsonwebtoken');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 * @param {import('express').NextFunction} next
 */
const validateJWT = (req, resp, next) => {
    const token = req.header('x-token');
    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token error',
        });
    }
    try {
        const { uid, userName } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.userName = userName;
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Invalid token',
        });
    }

    next();
};

module.exports = {
    validateJWT,
};
