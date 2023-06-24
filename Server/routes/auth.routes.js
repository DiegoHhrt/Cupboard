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
const { validateJWT, fieldValidation } = require('../middlewares');

const mailExp = new RegExp(/^[( \w \. \-)]{4,20}@((g|hot)mail|outlook|live).com$/);

const router = Router();

//New user creation
router.post(
    '/register',
    [
        check('email', 'Enter a valid email').isEmail().matches(mailExp),
        check('email', 'User already exists').custom(emailExists),
        check('password', 'Password is not optional').isLength({ min: 6 }),
        check('name', 'Name is not optional').not().isEmpty(),
        check('userName', 'User name is not optional').not().isEmpty(),
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
        check('name', 'Household name is not optional').not().isEmpty(),
        check('requestorId', 'Please enter a valid id').isMongoId(),
        check('requestorId', 'The requesting user does not exist').custom(userExistsById),
        check('requestorId', 'The requesting user is already in a household')
            .not()
            .custom(userBelongsToHousehold),
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
        check('requestorId', 'Please enter a valid id').isMongoId(),
        check('requestorId', 'The requesting user does not exist').custom(userExistsById),
        check('householdId', 'Household ID is not optional').isMongoId(),
        check('householdId', 'The household does not exist').custom(householdExistsById),
        check(
            'requestorId',
            'The user does not belong to this household or is not an admin'
        ).custom(userBelongsToHousehold),
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
