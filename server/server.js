import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3000;
const app = express();

// Create HTTP server from express app
const server = createServer(app);

// Create Socket.IO server with CORS settings
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"]
  }
});

// Express route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
 
  socket.broadcast.emit("welcome",`welcome to the server ${socket.id}`);
  // Example: listen for 'message' event
  socket.on("message", (data) => {
    console.log("Received message:", data);
    io.emit("message", data); // Broadcast to all clients
  });
  

  

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server (NOT app.listen)
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
