const jwt = require('jsonwebtoken');

const newJWt = (uid, userName) => {
    const payload = { uid, userName };

    return new Promise((resolve, reject) => {
        //TODO: Restore expiration time to something reasonable (use env variable?)
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '365d' }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    newJWt,
};
