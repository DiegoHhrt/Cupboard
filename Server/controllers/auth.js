const{response} = require('express');
const{request}=require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { newJWt } = require('../helpers/jwt');

// const newUser= async (req=request, resp=response) => {
//     const {email, name, pw} = req.body;

//     try 
//     {
//         const user = await User.findOne({email});

//         //Verify unique email
//         if(user) 
//         {
//             return resp.status(400).json({
//                 ok:false,
//                 msg: "User already exists"
//             })  
//         }
//         //Create user with model
//         const dbUser = new User(req.body);
//         //Password hash
//         const salt = bcrypt.genSaltSync();
//         dbUser.pw = bcrypt.hashSync(pw, salt);
//         //Json webToken generation
//         const token = await newJWt(dbUser.id, name)
//         //Create user on db
//         await dbUser.save();
//         //Succes response
//         return resp.status(201).json({
//             ok: true,
//             uid: dbUser.id,
//             name,
//             token,
//             email
//         });

//     } 
//     catch (error) 
//     {
//         return resp.status(500).json({
//             ok:false,
//             msg: "Please contact admin"
//         });    
//     }
// }

// const userLogin = async (req=request, resp=response) => {
//     const {email, pw} = req.body;

//     try 
//     {
//         const dbUser = await User.findOne({email});

//         //Existing email
//         if(!dbUser)
//         {
//             return resp.status(400).json({
//                 ok:false,
//                 msg: "Mail or password is not valid"
//             }); 
//         }
//         //Confirm matching pw
//         const validPassword = bcrypt.compareSync(pw, dbUser.pw);

//         if(!validPassword)
//         {
//             return resp.status(400).json({
//                 ok:false,
//                 msg: "mail or Password is not valid"
//             }); 
//         }

//         //new jwt
//         const token = await newJWt(dbUser.id, dbUser.name)

//         //response

//         resp.json({
//             ok: true,
//             uid: dbUser.id,
//             name: dbUser.name,
//             email: dbUser.email,
//             token
//         });
//     } 
//     catch (error) 
//     {
//         console.log(error);
//         return resp.status(500).json({
//             ok:false,
//             msg: "Please contact admin"
//         });  
//     }
// }

const tokenRenew = async (req=request, resp=response) => {
    const {uid}=req;

    //read db to get email
    const dbUser = await User.findById(uid);

    const token = await newJWt(uid, dbUser.name);
    
    return resp.json({
        ok:true,
        uid,
        name: dbUser.name,
        email: dbUser.email, 
        token,
        
    })
}


module.exports={
    // newUser,
    // userLogin,
    tokenRenew
}