const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../config/database')
const { header } = require('express-validator')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.api = '/api/v1'

        // Rutas a los diferentes Endpoints.
        this.paths = {
            auth: `${this.api}/auth`,
            users: `${this.api}/users`,
            verification: `${this.api}/verification`,
        };

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()

        // Mongo DB
        this.connectDB()
    }

    middlewares() {

        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization', 'x-token']
        }));

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
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.verification, require('../routes/verification.routes'))
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