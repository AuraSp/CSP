const express = require('express');

const log = require('./routes/logRoutes');

const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/api/', log);

module.exports = app;