import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});


io.use(socketAuthMiddleware);

const userSocketMap = {}; // {userId: connectionCount}

export function getReceiverSocketId(userId) {
  // Now returning the userId itself which acts as a room name
  return userId;
}

io.on("connection", (socket) => {
  const userId = socket.userId;
  if (userId) {
    socket.join(userId);
    userSocketMap[userId] = (userSocketMap[userId] || 0) + 1;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      userSocketMap[userId]--;
      if (userSocketMap[userId] <= 0) {
        delete userSocketMap[userId];
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };