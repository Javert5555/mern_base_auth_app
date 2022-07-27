import 'dotenv/config'
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI ||
        process.env.MONOG_HOST ||
        `mongodb://${(process.env.IP || 'localhost')}:${(process.env.MONGO_PORT || 27017)}/${process.env.COLLECTION_NAME}`
}

export default config