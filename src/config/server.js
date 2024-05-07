const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../config/database')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.api = '/api/v1'

        // Rutas a los diferentes Endpoints.
        this.paths = {
            auth: `${this.api}/auth`,
            users: `${this.api}/users`,
        };

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()

        // Mongo DB
        this.connectDB()
    }

    middlewares() {

        // CORS
        const corsOptions = {
            origin: ['*']
        }
        this.app.use(cors(corsOptions));

        this.app.use(express.json())

        this.app.use(express.static('public'))
    }

    async connectDB() {

        await dbConnection()

    }


    /**
     * Routes
     */
    routes() {

        this.app.use(this.paths.users, require('../routes/user.routes'))
    }


    /**
     * Deploy the server
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at PORT`, this.port)
        });
    }
}


module.exports = Server;