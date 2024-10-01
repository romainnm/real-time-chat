const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatControllers');

// REST API route for getting chat messages 
router.get('/messages', chatController.getMessages);

module.exports = router;