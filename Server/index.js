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
app.use( '/api/auth', require('./routes/auth') );

app.listen(process.env.PORT, () =>{
    console.log(`Server running in port ${ process.env.PORT }`)
});