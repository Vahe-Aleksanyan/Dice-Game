const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const publicDirectoryPath = path.join(__dirname, "../client");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(publicDirectoryPath));




io.on('connection', (socket) => {
    console.log("New WebSocket connection");

    socket.emit('message', {
        player1_score: 0,
        player2_score: 0,
        player3_score: 0

    });

    socket.on('send-Data', (data) => {
        io.emit('message', data)

    })


})



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/api/games", require("./routes/api/games"));


mongoose.connect('mongodb+srv://vahe0512:v05746606@cluster0-xcxkn.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
});




server.listen(3030, () => {
    console.log("Server is on the port 3030.");
});

