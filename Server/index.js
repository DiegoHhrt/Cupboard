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
app.use( '/api/getitems', require('./routes/getinfo/getitems') );
app.use('/api/gethouseholdinfo', require('./routes/getinfo/gethouseholdinfo'));
app.use('/api/getuserinfo'), require('./routes/getinfo/getuserinfo');
    //update information
app.use( '/api/update', require('./routes/update/update') );

app.listen(process.env.PORT, () =>{
    console.log(`Server running in port ${ process.env.PORT }`)
});