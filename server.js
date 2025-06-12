const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from /public
app.use(express.static('public'));

// Handle new connections
io.on('connection', (socket) => {
  console.log('🟢 New user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // broadcast to all users
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

server.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
