const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, userLogin, tokenRenew } = require('../../controllers/auth/auth');
const { fieldValidation } = require('../../middlewares/fieldValidation');
const { validateJWT } = require('../../middlewares/validateJwt');

const mailExp = new RegExp(/^[( \w \. \-)]{4,20}@((g|hot)mail|outlook|live).com$/);

const router = Router();

//New user creation
router.post('/register', [
    check('email', 'Email is not optional').matches(mailExp),
    check('password', 'Password is not optional').isLength({min:6}),
    check('name', "Name is not optional").not().isEmpty(),
    check('userName', "User name is not optional").not().isEmpty(),
    fieldValidation 
], newUser);

//User login
router.post('/', [
    check('email', 'Enter a valid email').optional().matches(mailExp),
    check('password', 'Password is not optional').isLength({min:6}),
    fieldValidation
], userLogin);

//Token validation
router.get('/renew', [
    validateJWT
], tokenRenew);

module.exports = router;