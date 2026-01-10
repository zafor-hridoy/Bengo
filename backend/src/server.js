import express from "express";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";


const __dirname = path.resolve();

app.use(cors({
    origin: [ENV.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Root route for health check
app.get("/", (req, res) => {
  res.json({ message: "Bengo Backend API is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

if (ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))


    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}


server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please kill existing processes or use a different port.`);
        process.exit(1);
    }
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});