const express = require('express');
const path = require('path');
const chatRoutes = require('./routes/chatRoutes');
const helmet = require('helmet')

const app = express();
// Ignore favicon requests to avoid errors
app.get('/favicon.ico', (req, res) => res.status(204));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON
app.use(express.json());

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "http://localhost:3000"], // Allow images (including favicon) from localhost
        connectSrc: ["'self'", "ws://localhost:3000"], // Allow WebSocket connections from localhost
      },
    })
  );

// Define routes
app.use('/api/chat', chatRoutes); // API route for chat functionality

module.exports = app;