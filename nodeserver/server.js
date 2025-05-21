const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000;

// Create HTTP server and bind it with Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ✅ Serve static frontend files from /public folder
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Fallback route to serve index.html for SPA support
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 🔌 Socket.io WebSocket events
const users = {};

io.on("connection", (socket) => {
  // New user joined
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  // Send message
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message,
      name: users[socket.id]
    });
  });

  // User disconnected
  socket.on("disconnect", () => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

// ✅ Start server
httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
