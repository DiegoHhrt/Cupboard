const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const {
    authRoutes,
    householdRoutes,
    listItemsRoutes,
    userRoutes,
    searchRoutes,
} = require('../routes');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORt;
        //Db connection
        this.dbConnect();

        //APi routes
        this.paths = {
            authPath: '/api/auth',
            HouseholdPath: '/api/household',
            ListItemsPath: '/api/list-items',
            UserPath: '/api/users',
            SearchPath: '/api/search',
        };

        //Middlewares
        this.middlewares();
        //App routes
        this.routes();

        //TODO: add a ticket raising system (Maybe using sockets) for home tasks
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
        this.app.use(this.paths.authPath, authRoutes);
        //Household
        this.app.use(this.paths.HouseholdPath, householdRoutes);
        //Items
        this.app.use(this.paths.ListItemsPath, listItemsRoutes);
        //User
        this.app.use(this.paths.UserPath, userRoutes);
        //Search
        this.app.use(this.paths.SearchPath, searchRoutes);
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port: ${this.PORT}`);
        });
    }
}

module.exports = Server;
