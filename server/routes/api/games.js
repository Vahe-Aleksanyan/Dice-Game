const express = require("express");
const router = express.Router();

const Game = require("../../models/Game");

/**
 * @route  POST api/games
 * @desc   Create a game
 */
router.post("/", async (req, res) => {
    const { firstPlayer, secondPlayer, thirdPlayer } = req.body;
    const arr = [firstPlayer, secondPlayer, thirdPlayer];
    const maxVal = Math.max(...arr.map(item => item.sum));

    let winner;
    arr.map(item => {
        if (item.sum === maxVal) {
            winner = item;
        }
    });

    try {
        const newGame = new Game({
            firstPlayer,
            secondPlayer,
            thirdPlayer,
            winner
        });

        const game = await newGame.save();

        res.json(game);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;