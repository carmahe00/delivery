const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

require('dotenv').config();

const app = express()
//CORS
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/users', require('./routers/userRouter'));

app.listen(process.env.PORT, async () => {
    console.log(`Server up on http://localhost:${process.env.PORT}`)
    try {
        await sequelize.authenticate();
        console.log('Base de datos sincronizada!')
    } catch (error) {
        console.log('**** Error ****')
        console.error(error)
    }

});
