const { Router } = require('express');
const { check } = require('express-validator');
const {
    createHousehold,
    createNutritionGoals,
    newUser,
    tokenRenew,
    userLogin,
} = require('../controllers');
const {
    emailExists,
    userExistsById,
    userBelongsToHousehold,
    householdExistsById,
} = require('../helpers/db-validators');
const { validateJWT, fieldValidation, householdAdminValidation } = require('../middlewares');

const mailExp = new RegExp(/^[( \w \. \-)]{4,20}@((g|hot)mail|outlook|live).com$/);

const router = Router();
//New user creation
router.post(
    '/register',
    [
        check('email', 'Enter a valid email').isEmail().matches(mailExp),
        check('email', 'User already exists').custom(emailExists),
        check('password', 'Password must be +6 characters long').isLength({ min: 6 }),
        check('name', 'Name is not optional').not().isEmpty(),
        check('userName', 'User name is not optional').not().isEmpty().isLength({ min: 4 }),
        check('userName', 'User name must be +4 characters long').isLength({ min: 4 }),
        check('budget', 'Insert a valid budget').optional().isInt({ min: 0 }),
        fieldValidation,
    ],
    newUser
);

//User login
router.post(
    '/',
    [
        check('email', 'Enter a valid email').isEmail().matches(mailExp),
        check('email', 'User does not exist').not().custom(emailExists),
        check('password', 'Password is not optional').isLength({ min: 6 }),
        fieldValidation,
    ],
    userLogin
);

//household creation
router.post(
    '/household',
    [
        validateJWT,
        check('requestorId', 'The requesting user is already in a household')
            .not()
            .custom(userBelongsToHousehold),
        check('name', 'Household name is not optional').not().isEmpty(),
        check('lowLevel', 'Insert a valid value: (0-100)')
            .optional()
            .isInt({ min: 0, max: 100 }),
        //TODO: add currency validation
        check('currency', 'Insert a valid currency').optional(),
        check('budget', 'Insert a valid budget').optional().isInt({ min: 0 }),
        fieldValidation,
    ],
    createHousehold
);

//Nutrition goals creation
router.post(
    '/c-nutritiongoals',
    [
        validateJWT,
        householdAdminValidation,
        check('startingDate', 'Insert a valid starting date (tomorrow)').isDate().isAfter(),
        check('period', 'Insert a valid period').isIn(['daily', 'weekly', 'monthly']),
        check('totalPeriodCalories', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: -1 }),
        check('totalPeriodProtein', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: -1 }),
        check('totalPeriodCarbs', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: -1 }),
        check('totalPeriodFat', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: -1 }),
        check('totalPeriodFiber', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: -1 }),
        check('totalPeriodSugar', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: -1 }),
        check('totalPeriodSodium', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: -1 }),
        check('totalPeriodCholesterol', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: -1 }),
        check('animalBalanceGoal', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: 0, max: 100 }),
        check('vegetalBalanceGoal', 'Insert 0 or positive numeric value')
            .optional()
            .isInt({ min: 0, max: 100 }),
        fieldValidation,
    ],
    createNutritionGoals
);

//Token validation
router.get('/renew', [validateJWT], tokenRenew);

module.exports = router;
