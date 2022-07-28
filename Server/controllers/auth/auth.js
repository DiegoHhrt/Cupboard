const{response} = require('express');
const{request}=require('express');
const User = require('../../models/User');
const {Household} = require('../../models/Household');
const bcrypt = require('bcryptjs');
const { newJWt } = require('../../helpers/jwt');
const { ShoppingList, Inventory, Wishlist } = require('../../models/Lists');
const {NutritionGoals} = require('../../models/Nutrition');
const newUser= async (req=request, resp=response) => {
    const {email, userName, password} = req.body;

    try 
    {
        const user = await User.findOne({email});

        //Verify unique email
        if(user) 
        {
            return resp.status(400).json({
                ok:false,
                msg: "User already exists"
            })  
        }
        //Create user with model
        const dbUser = new User(req.body);
        //Password hash
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);
        //shopping list object creation on document
        const shoppingList = new ShoppingList({ownerId:dbUser.id, ownedBy: 'User' });
        dbUser.shoppingList = shoppingList.id;
        //inventory object creation on document
        const inventory = new Inventory({ownerId:dbUser.id, ownedBy: 'User' });
        dbUser.inventory = inventory.id;
        //wishlist object creation on document
        const wishList = new Wishlist({ownerId:dbUser.id, ownedBy: 'User' });
        dbUser.wishList = wishList.id;
        //Json webToken generation
        const token = await newJWt(dbUser.id, userName)
        //Create user and auxiliary documents on db
        await dbUser.save();
        await shoppingList.save();
        await inventory.save();
        await wishList.save();
        //Succes response
        return resp.status(201).json({
            ok: true,
            uid: dbUser.id,
            token
        });

    } 
    catch (error) 
    {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });    
    }
}

const userLogin = async (req=request, resp=response) => {
    const {email, password} = req.body;

    try 
    {
        const dbUser = await User.findOne({email});
        //Existing email
        if(!dbUser)
        {
            return resp.status(400).json({
                ok:false,
                msg: "Mail or password is not valid"
            }); 
        }
        //Confirm matching password
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword)
        {
            return resp.status(400).json({
                ok:false,
                msg: "mail or Password is not valid"
            }); 
        }

        //new jwt
        const token = await newJWt(dbUser.id, dbUser.userName)

        //response

        resp.status(200).json({
            ok: true,
            uid: dbUser.id,
            token
        });
    } 
    catch (error) 
    {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });  
    }
}

const createHousehold = async (req=request, resp=response) => {
    const {name, requestorId, lowLevel, currency, budget} = req.body;
    const info = {
        name,
        members: [requestorId],
        admins: [requestorId],
        lowLevel,
        currency,
        budget
    }
    try {
        //Verifies if user exists
        const user = await User.findById(requestorId);
        if(!user) {
            return resp.status(400).json({
                ok:false,
                msg: "User not found"
            })
        }
        //Verifies if user belongs to a household already
        if(user.household) {
            return resp.status(400).json({
                ok:false,
                msg: "User already has a household"
            })
        }
        //Create household and auxiliary objects with model
        const household = new Household(info);
        const shoppingList = new ShoppingList({ ownedBy: 'Household', ownerId: household.id });
        const inventory = new Inventory({ ownedBy: 'Household', ownerId: household.id });
        
        household.shoppingList = shoppingList.id;
        household.inventory = inventory.id;
        //Save household and auxiliary documents on db
        await household.save();
        await shoppingList.save();
        await inventory.save();

        //Update user with household id
        user.household = household.id;
        await user.save();

        //Response
        return resp.status(201).json({
            ok: true,
            household: household.id,
            user: user.id
        });

    } 
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });      
    }
};

const createNutritionGoals = async (req=request, resp=response) => {
    const { requestorId, householdId, date, 
            period, cal, protein, carbs, 
            fat, fiber, sugar, sodium,
            cholesterol, animalBalanceGoal,
            vegetalBalanceGoal
    } = req.body;
    const info = {
        householdId, period,
        startingDate: date,
        totalPeriodCalories: cal,
        totalPeriodProtein: protein,
        totalPeriodCarbs: carbs,
        totalPeriodFat: fat,
        totalPeriodFiber: fiber,
        totalPeriodSugar: sugar,
        totalPeriodSodium: sodium,
        totalPeriodCholesterol: cholesterol,
        animalBalanceGoal,
        vegetalBalanceGoal
    };
    try {
        //Verifies if user exists
        const user = await User.findById(requestorId);
        if(!user) {
            return resp.status(400).json({
                ok:false,
                msg: "User not found"
            })
        }
        //Verifies if household exists
        const household = await Household.findById(householdId);
        if(!household) {
            return resp.status(400).json({
                ok:false,
                msg: "Household not found"
            })
        }
        //Verifies if user belongs to the household
        if(!household.members.includes(requestorId)) {
            return resp.status(400).json({
                ok:false,
                msg: "User does not belong to the household"
            })
        }
        //Verifies if user is a household admin
        if(!household.admins.includes(requestorId)) {
            return resp.status(401).json({
                ok:false,
                msg: "User is not an admin of the household"
            })
        }

        //Create nutrition goals and assigns to household
        const nutritionGoals = new NutritionGoals(info);
        household.nutritionGoals = nutritionGoals.id;
        await household.save();
        await nutritionGoals.save();

        console.log(household, nutritionGoals);

        //Response
        return resp.status(201).json({
            ok: true,
            nutritionGoals: nutritionGoals.id,
            household: household.id
        });
    } 
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg: "Please contact admin"
        });
    }
};

const tokenRenew = async (req=request, resp=response) => {
    const {uid}=req;

    //read db to get email
    const dbUser = await User.findById(uid);

    const token = await newJWt(uid, dbUser.userName);
    
    return resp.json({
        ok:true,
        uid,
        userName: dbUser.userName,
        email: dbUser.email, 
        token,
        
    })
}


module.exports={
    newUser,
    userLogin,
    createHousehold,
    createNutritionGoals,
    tokenRenew
}