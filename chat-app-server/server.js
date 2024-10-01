const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for now (can be restricted in production)
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chatMessage', (msg) => {
    /* // Need to create auth and tokens
    const messageData = {
      username: user.username,
      message: msg,
      timestamp: new Date()
    }; */

    io.emit('chatMessage', msg); // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('WebSocket server is running on ws://localhost:3000');
});