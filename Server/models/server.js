const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORt;
        //Db connection
        this.dbConnect();

        //APi routes
        this.authPath = '/api/auth';
        this.getItemsPath = '/api/getitems';
        this.getHouseholdInfoPath = '/api/gethouseholdinfo';
        this.getUserInfoPath = '/api/getuserinfo';
        this.updateHouseholdInfoPath = '/api/updatehouseholdinfo';
        this.updateUserinfoPath = '/api/updateuserinfo';
        this.itemsPath = '/api/items';

        //Middlewares
        this.middlewares();
        //App routes
        this.routes();
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Read and parse of body
        this.app.use(express.json());

        //Public folder
        this.app.use(express.static('public'));
    }

    routes() {
        //authentication
        this.app.use(this.authPath, require('../routes/auth/auth'));
        //get information
        this.app.use(
            this.getItemsPath,
            require('../routes/getinfo/getListItems')
        );
        this.app.use(
            this.getHouseholdInfoPath,
            require('../routes/getinfo/getHouseholdInfo')
        );
        this.app.use(
            this.getUserInfoPath,
            require('../routes/getinfo/getUserInfo')
        );
        //update information
        this.app.use(
            this.updateHouseholdInfoPath,
            require('../routes/update/updateHouseholdInfo')
        );
        this.app.use(
            this.updateUserinfoPath,
            require('../routes/update/updateUserInfo')
        );
        //manipulate items
        this.app.use(this.itemsPath, require('../routes/items/items'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port: ${this.PORT}`);
        });
    }
}

module.exports = Server;
