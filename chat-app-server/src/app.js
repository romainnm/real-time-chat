const express = require('express');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

module.exports = app;