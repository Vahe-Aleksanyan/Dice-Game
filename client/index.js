const socket = io();
const firstRoll = document.getElementById("p1-roll");
const secondRoll = document.getElementById("p2-roll");
const thirdRoll = document.getElementById("p3-roll");
const template = document.querySelectorAll(".template"); // returns an array

socket.on('message', (mes) => {

    template.forEach((e) => {
        var str = '';
        for (var p in mes) {
            if (mes.hasOwnProperty(p)) {
                str += p + ':' + mes[p] + '<br />';
            }
        }
        e.innerHTML = str;
    });
});


let player_1 = {
    name: 'Player 1',
    sum: 0,
    count: 1,
};

let player_2 = {
    name: 'Player 2',
    sum: 0,
    count: 1,
};

let player_3 = {
    name: 'Player 3',
    sum: 0,
    count: 1,
};

const p1Roll = () => {

    let num = Math.floor(Math.random() * 6 + 1);
    document.getElementById("p1-roll-img").src = "images/dice" + num + ".png"

    player_1.sum += num;
    player_1.count++;
    //document.getElementById("p1-score").innerHTML = player_1.sum;

    socket.emit('send-Data', {
        player1_score: player_1.sum,
        player2_score: 0,
        player3_score: 0,
    });

    if (player_1.count > 3) {
        document.getElementById("player_1").classList.remove('active');
        document.getElementById("player_2").classList.add("active");
        firstRoll.disabled = true;
        secondRoll.disabled = false;

    }
};


const p2Roll = () => {

    let num = Math.floor(Math.random() * 6 + 1);
    document.getElementById("p2-roll-img").src = "images/dice" + num + ".png"

    player_2.sum += num;
    player_2.count++;
    player_2.current = num;
    //document.getElementById("p2-score").innerHTML = player_2.sum;

    socket.emit('send-Data', {
        player1_score: player_1.sum,
        player2_score: player_2.sum,
        player3_score: 0

    });

    if (player_2.count > 3) {
        document.getElementById("player_2").classList.remove('active');
        document.getElementById("player_3").classList.add("active");
        secondRoll.disabled = true;
        thirdRoll.disabled = false;
    }
};


const p3Roll = () => {

    let num = Math.floor(Math.random() * 6 + 1);
    document.getElementById("p3-roll-img").src = "images/dice" + num + ".png"

    player_3.sum += num;
    player_3.count++;
    player_3.current = num;
    //document.getElementById("p3-score").innerHTML = player_3.sum;

    socket.emit('send-Data', {
        player1_score: player_1.sum,
        player2_score: player_2.sum,
        player3_score: player_3.sum,

    });

    if (player_3.count > 3) {
        document.getElementById("player_3").classList.remove('active');
        thirdRoll.disabled = true;

        let arr = [player_1.sum, player_2.sum, player_3.sum]
        showwinner(arr);

        fetch('http://localhost:3030/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstPlayer: player_1,
                secondPlayer: player_2,
                thirdPlayer: player_3,
            })
        });
    }
};

const showwinner = (arr) => {
    const bignum = Math.max(...arr);
    document.getElementById('winner').innerHTML = `The winner is the player ${arr.indexOf(bignum) + 1}`
};

firstRoll.addEventListener('click', p1Roll);
secondRoll.addEventListener('click', p2Roll);
thirdRoll.addEventListener('click', p3Roll);