const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, userLogin, tokenRenew } = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/fieldValidation');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// //New user creation
// router.post('/register', [
//     check('email', 'Email is not optional').isEmail(),
//     check('pw', 'Password is not optional').isLength({min:6}),
//     check('name', "Name is not optional").not().isEmpty(),
//     fieldValidation 
// ], newUser);

// //User login
// router.post('/', [
//     check('email', 'Email is not optional').isEmail(),
//     check('pw', 'Password is not optional').isLength({min:6}),
//     fieldValidation
// ], userLogin);

//Token validation
router.get('/renew', [
    validateJWT
], tokenRenew);

module.exports = router;