import mongoose from 'mongoose'
import config from './../config/config'
import app from './express'

const startServer = async () => {
    try {
        mongoose.connect(config.mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    
        app.listen(config.port, err => {
            console.info(`Server started on port ${config.port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()