// Servidor de Express
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const { sequelize } = require('../models/index');
const { domicilios } = require('../models');
const bodyParser = require('body-parser');

const Sockets = require('./sockets');
const { grabarDomicilio } = require('../controllers/socket');

class Servidor {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = createServer(this.app);

        // Configuraciones de sockets
        this.io = new Server(this.server, {
            cors: {
                origins: ['*']
            }
        });

        this.io.on('connection', async(socket) => {
            console.log('a user connected');
            this.io.emit('lista-domicilios', await domicilios.findAll() )
            this.io.on('emitir-mensaje',async(data) =>{
                console.log("Acá")
                const solicitudes = await grabarDomicilio(data)
                console.log(solicitudes)
                this.io.emit('lista-domicilios', await domicilios.findAll() )
            })
            socket.on('disconnect', () => { console.log('user disconnected') });
        })
    }

    middlewares() {

        // CORS
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(express.json())

        this.app.use('/api/users', require('../routers/userRouter'));
        this.app.use('/api/cities', require('../routers/cityRoute'));
        this.app.use('/api/uploads', require('../routers/uploadRouters'));
        this.app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
    }



    execute() {

        // Inicializar Middlewares
        this.middlewares();
        // Inicializar Server
        this.server.listen(this.port, async () => {
            console.log(`Server up on http://localhost:${process.env.PORT}`)
            try {
                await sequelize.authenticate();
                console.log('Base de datos sincronizada!')
            } catch (error) {
                console.log('**** Error ****')
                console.error(error)
            }
        });
    }
}

module.exports = Servidor;