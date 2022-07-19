const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'yourJwtSecretKey',
    mongoUri: process.env.MONGODB_URI ||
        process.env.MONOG_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || 'number of your db port') +'/yourCollectionName'
}

export default config