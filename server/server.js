require('dotenv').config();

const logger = require('./logger');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => {
        logger.log({
            level: 'warn',
            message: 'Connected to Mongo DB'
        });
    });

app.listen(process.env.SERVER_PORT, function (err) {
    if (err) {
        logger.log({
            level: 'error',
            message: 'Error in the server setup'
        });
    } else {
        logger.log({
            level: 'info',
            message: `App is running on ${process.env.SERVER_PORT}`
        });
    };
});

