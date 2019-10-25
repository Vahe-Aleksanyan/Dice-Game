const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    firstPlayer: {
        type: Object,
        required: true
    },
    secondPlayer: {
        type: Object,
        required: true
    },
    thirdPlayer: {
        type: Object,
        required: true
    },
    winner: {
        type: Object,
        required: true
    }
});

module.exports = Game = mongoose.model("game", GameSchema);