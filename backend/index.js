
require("dotenv").config();
const express = require('express');
const connectToDatabase = require('./src/internal/db.init');
const appConfig = require('./config/index');
const startingMiddleware = require('./src/middleware/starting.middleware');

const bootstrap = async () => {
    const app = express();

    startingMiddleware(app);
    await connectToDatabase();

    // Set trust proxy to enable 'X-Forwarded-For' header
    app.set('trust proxy', true);

    // Available Routes
    app.use('/api/v1/auth', require('./src/routes/auth'))
    app.use('/api/v1/auth', require('./src/routes/user'))
    app.use('/api/v1/admin/trading', require('./src/routes/trading'))

    // unexpected  router hit shows error
    app.all('*', (req, res, next) => {
        next(
            res.status(404).json({ err: `Can't find ${req.originalUrl} on this server!` })
        );
    })

    app.listen(appConfig.app.port, () => {
        console.log(`Server is running at ${appConfig.app.port}`)
    });

    process.on('unhandledRejection', err => {
        console.log('UNHANDLED REJECTION! 💥 Shutting down...');
        console.log(JSON.stringify(err, null, 2));
    });

    process.on('SIGTERM', () => {
        console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
        console.log(JSON.stringify(err, null, 2));
    });
    process.on('uncaughtException', err => {
        console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
        console.log(JSON.stringify(err, null, 2));
    });
};

(async () => {
    await bootstrap();
})();