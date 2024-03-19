const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


app.get('/', (req, res) => {
    res.send("Welcome")
})

io.on("connect", (socket) => {
    console.log("Someone connected", socket.id)
    // socket.on("join-room", ({ roomId, userName }) => {
    //     console.log("User Joined room")
    //     console.log(roomId, ":", userName)
    // })
})

const port = 3001
httpServer.listen(port, () => {
    console.log(`Backend started on port localhost:${port}`)
})