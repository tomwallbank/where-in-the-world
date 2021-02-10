const express = require('express');
const app = express();
const http = require('http').createServer(app);
const fs = require('fs');
const io = require('socket.io')(http);

let gameList = [];
let game;

app.use(express.static('views'))
app.set('view engine', 'ejs'); 

app.get("/", (req, res) => {
    console.log("index")
    res.render("index");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get("/game", (req, res) => {
    let status = req.query.status;
    // let name = req.query.name;
    // let host = req.query.;
    
    
    if (status.state ===  1){
    // Send Game Lobby
    } else if ( status.state === 2) {
    // Send Started Game    
    } else if ( status.state === 3) {
        
    }
 
 
 
    console.log("new game")
    res.send();
})

app.get("/new-game", (req, res) => {
    let name = req.query.name
    game = new Game(name);
    gameList.push(game.code)
    // game.addPlayer(name)
    let clue = getClue();
    console.log("game", game)
    res.send(game);
});

app.get("/join-game", (req, res) => {
    let name = req.query.name;
    let code = req.query.code;
    game.addPlayer(name);
    console.log(game)
    res.send(game);
})

const port = process.env.PORT;
app.listen(port, () => console.log('Corona App listening on port', port));


/// FUNCTIONS
function getClue(){
    
    fs.readFile('./data/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            // parse JSON string to JSON object
            let clues = JSON.parse(data).clues;
            // Generate Random Number
            let num = Math.floor(Math.random() * clues.length)
    
            // Return random clue from DB
            return clues[num]
        }
    });
}

function newGame(){
    // create new Game object
    let game = new Game;
        // Generate game code (check against existing game codes)
        // create list of players + score
        // status 
        // list of used clues
    
}

class Game {
    constructor(name){
        this.status = "open"
        this.players = [];
        this.usedClues = [];
        this.code = codeGen();
        this.addPlayer(name, 1)
        // this.generateCode = codeGen()
    }

    // Add new player
    addPlayer(name, x){
        console.log(name)
        let player = {
            admin: x,
            name: name,
            score: 0,
            status: "joined" // ?? needed ?? 
        }
        console.log(player)
        this.players.push(player)
    }
    
    // Leave game
    removePlayer(){
        
    }
    
    // Start game // change status?
    startGame(){
        this.status = "started";
    }

    countScores(){
        
    }
    
}

function codeGen(){
    return Math.floor(Math.random() * 999999)
}