const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const publicDirectoryPath = path.join(__dirname, "../client");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/api/games", require("./routes/api/games"));

mongoose.connect('mongodb+srv://vahe0512:v05746606@cluster0-xcxkn.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
});

app.listen(3030, () => {
    console.log("Server is on the port 3030.");
});

