const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./database/config');
require('dotenv').config();

//creación de servidor/app express
const app = express();

//DataBase
dbConnect();

//Public directory
app.use(express.static('public'))

//CORS
app.use(cors());

// body parse and reading
app.use(express.json());

//Routes
    //authentication
app.use( '/api/auth', require('./routes/auth/auth') );
    //get information
app.use( '/api/getitems', require('./routes/getinfo/getItems') );
app.use('/api/gethouseholdinfo', require('./routes/getinfo/getHouseholdInfo'));
app.use('/api/getuserinfo', require('./routes/getinfo/getUserInfo'));
    //update information
app.use( '/api/updateitems', require('./routes/update/updateItems') );
app.use('/api/updatehouseholdinfo', require('./routes/update/updateHouseholdInfo'));
app.use('/api/updateuserinfo', require('./routes/update/updateUserInfo'));

app.listen(process.env.PORT, () =>{
    console.log(`Server running in port ${ process.env.PORT }`)
});