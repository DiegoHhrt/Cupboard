const { Router } = require('express');
const { check } = require('express-validator');
const {
    updateNutritionGoals,
    updateHousehold,
    upgradeUserToAdmin,
    getHousehold,
    getHouseholdList,
    joinUserToHousehold,
    removeUserFromHousehold,
    downgradeAminToMember,
    updatePlannedRecipes,
} = require('../controllers');
const {
    fieldValidation,
    validateJWT,
    validateHouseholdListType,
    householdAdminValidation,
} = require('../middlewares');
const { userBelongsToHousehold, userExistsById } = require('../helpers');

const router = Router();

//Gets a household's information
router.get(
    '/',
    [
        validateJWT,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
        fieldValidation,
    ],
    getHousehold
);

router.get(
    '/get-list/:listType',
    [
        validateJWT,
        validateHouseholdListType,
        check('listType', 'Valid list type is required').isIn([
            'inventory',
            'shopping-list',
            'planned-foods',
        ]),
        fieldValidation,
    ],
    getHouseholdList
);

//Updates household's information
router.put(
    '/',
    [
        validateJWT,
        householdAdminValidation,
        check('name', 'Household name must be at least 4 characters')
            .optional()
            .isLength({ min: 4 }),
        check('budget', 'A budget of 0 or greater is required').optional().isInt({ min: 0 }),
        //TODO: add currency validation
        check('currency', 'A valid currency is required').optional(),
        check('lowLevel', 'Low level must be a percentage between 0 and 100')
            .optional()
            .isInt({ min: 0, max: 100 }),
        fieldValidation,
    ],
    updateHousehold
);

//Join user to household
router.put(
    '/move-user/join',
    [
        validateJWT,
        householdAdminValidation,
        check('userId', 'existing user ID is required').isMongoId(),
        check('userId', 'existing user ID is required').custom(userExistsById),
        check('userId', 'user already belongs to a household')
            .not()
            .custom(userBelongsToHousehold),
        fieldValidation,
    ],
    joinUserToHousehold
);
// Remove user from household
router.put(
    '/move-user/remove',
    [
        validateJWT,
        householdAdminValidation,
        check('userId', 'existing user ID is required').isMongoId(),
        check('userId', 'existing user ID is required').custom(userExistsById),
        check('userId', 'user does not belong to a household').custom(userBelongsToHousehold),
        check('newAdminId', 'A valid ID is required').optional().isMongoId(),
        check('newAdminId', 'An existing member of the household is required')
            .optional()
            .custom(userExistsById),
        fieldValidation,
    ],
    removeUserFromHousehold
);
//Upgrade user to admin
router.put(
    '/move-user/admin',
    [
        validateJWT,
        householdAdminValidation,
        check('userId', 'existing user ID is required').isMongoId(),
        check('userId', 'existing user ID is required').custom(userExistsById),
        check('userId', 'user does not belong to a household').custom(userBelongsToHousehold),
        fieldValidation,
    ],
    upgradeUserToAdmin
);
//Downgrade admin to member
router.put(
    '/move-user/member',
    [
        validateJWT,
        householdAdminValidation,
        check('userId', 'existing user ID is required').isMongoId(),
        check('userId', 'existing user ID is required').custom(userExistsById),
        check('userId', 'user does not belong to a household').custom(userBelongsToHousehold),
        fieldValidation,
    ],
    downgradeAminToMember
);

//Nutrition goals update
router.put(
    '/nutrition-goals',
    [
        validateJWT,
        householdAdminValidation,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
        check('startingDate', 'Insert a valid starting date (tomorrow)')
            .optional()
            .isDate()
            .isAfter(),
        check('period', 'Insert a valid period')
            .optional()
            .isIn(['daily', 'weekly', 'monthly']),
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
    updateNutritionGoals
);

//Update household's planned foods
router.put(
    '/planned-foods',
    [
        validateJWT,
        check('requestorId', 'The requesting user is not member of a household').custom(
            userBelongsToHousehold
        ),
        check('name', 'Food must have a name').not().isEmpty(),
        check('recipeLink', 'Recipe link must be a valid URL').optional().isURL(),
        check('plannedDate', 'Planned date must be a valid date (tomorrow)')
            .isDate()
            .isAfter(),
        fieldValidation,
    ],
    updatePlannedRecipes
);

//TODO:
//delete stuff

module.exports = router;
