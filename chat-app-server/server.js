require('dotenv').config(); // Load environment variables

const http = require('http');
const app = require('./src/app'); // Import the express app
const socketService = require('./src/services/socketService'); // Import socket service

const PORT = process.env.PORT || 3000;
const server = http.createServer(app); // Create HTTP server

// Initialize WebSocket service
socketService.init(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
