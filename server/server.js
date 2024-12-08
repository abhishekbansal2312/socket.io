const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (msg) => {
    console.log(`Message from ${msg.username}: ${msg.msg}`);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.username}`);
  });
});

app.post("/login", (req, res) => {
  const { username } = req.body;
  if (username) {
    const token = jwt.sign({ username }, "bansal", {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).send({ message: "Logged in successfully" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
