const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
    res.send("Welcome")
})

io.on("connection", (socket) => {
    console.log("Someone connected", socket.id)
    // socket.on("join-room", ({ roomId, userName }) => {
    //     console.log("User Joined room")
    //     console.log(roomId, ":", userName)
    // })
})

const port = 3001
server.listen(port, () => {
    console.log(`Backend started on port localhost:${port}`)
})