// socket 服务端
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    console.log('user disconnected', msg);
    socket.emit('message', { ...msg, type: true });
    socket.broadcast.emit('dmessage', { ...msg, type: false });
  });
});

server.listen(8888, () => {
  console.log('server running at http://127.0.0.1:8888');
});