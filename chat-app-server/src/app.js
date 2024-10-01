const express = require('express');
const path = require('path');

const app = express();

// Middleware for parsing JSON
app.use(express.json());

module.exports = app;