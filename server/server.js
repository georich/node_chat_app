const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', { // emits to one connection
  //   from: 'George',
  //   text: 'Hello!',
  //   createdAt: 28395
  // });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    io.emit('newMessage', { // emits to all connections
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
