module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MongoDB_URI: process.env.MONGODB_URI || 'Your uri',
    JWT_SECRET: process.env.JWT_SECRET || 'secret'
}