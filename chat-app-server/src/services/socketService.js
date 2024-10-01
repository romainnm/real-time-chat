const { Server } = require('socket.io');

let io;

module.exports = {
  init(server) {
    // Initialize Socket.IO
    io = new Server(server, {
      cors: {
        origin: "*", // Set allowed origins for cross-origin requests
        methods: ["GET", "POST"],
      },
    });

    // Handle WebSocket connections
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      // Listen for chat messages from the client
      socket.on('chatMessage', (message) => {
        console.log('Received message:', message);
        // Broadcast the message to all clients
        io.emit('chatMessage', message);
      });

      // Handle client disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  },
};
