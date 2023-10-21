//require('dotenv').config()
import dotenv from 'dotenv';

import express from 'express'
import { sequelize } from './db.js'
import { UsersModel } from './models/models.js'
import cors from 'cors'
import router from './routes/index.js'
import {errorHandler} from './middleware/errorHandle.js'
// const express = require("express")
// const sequelize = require('./db')
// const models = require('./models/models')
// const cors = require('cors')
// const router = require('./routes/index')
// const errorHandler = require('./middleware/errorHandle')
dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


app.use(errorHandler)

// app.get('/', (req, resp) => {
//     resp.status(200).json({message: 'Work'})
// })

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => { console.log(`starting at PORT = ${PORT}`) })
    } catch (e) {
        console.log(e)
    }
}

start()

