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

let users = [];


app.get('/', (req, res) => {
    res.send("Welcome")
})

const addUser = (userName, roomId) => {
    users.push({
        userName: userName,
        roomId: roomId
    })
}

const getRoomUsers = (roomId) => {
    return users.filter(user => user.roomId === roomId);
}

const userLeave = (userName) => {
    users = users.filter(user => user.userName !== userName);
}

io.on("connection", (socket) => {
    console.log("Someone connected", socket.id)
    socket.on("join-room", ({ roomId, userName }) => {
        console.log("User Joined room")
        console.log(roomId, ":", userName)

        socket.join(roomId);
        addUser(userName, roomId);
        socket.to(roomId).emit('user-connected', userName);

        io.to(roomId).emit('all-users', getRoomUsers(roomId));

        socket.on('disconnect', () => {
            console.log("Disconnected");
            socket.leave(roomId);
            userLeave(userName);
            io.to(roomId).emit('all-users', getRoomUsers(roomId));
        })
    })
})

const port = 3001
httpServer.listen(port, () => {
    console.log(`Backend started on port localhost:${port}`)
})