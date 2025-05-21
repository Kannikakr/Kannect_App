const { createServer } = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 8000;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    console.log("New user:", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', message => {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id]
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
});
