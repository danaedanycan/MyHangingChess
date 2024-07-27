const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');  // Pour parser les données JSON

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const GameEntity = require('./entities/GameEntity');

app.use(cors());
app.use(bodyParser.json()); // Ajout du middleware pour parser les JSON

app.get('/creategame', (req, res) => {
    let board = new GameEntity();
    res.status(200).json(board); // Utilisation de res.json pour une réponse JSON directe
});

app.post('/getvalidmove', (req, res) => {
    // Traitez les données ici, req.body contiendra les données JSON
    console.log(req.body);
    console.log("\n")
    if (req.body.piece.piece !== null) {
        let game = GameEntity.fromJSON(req.body.board);
        let Piece = game.findPiece(req.body.piece.pos_x, req.body.piece.pos_y);
        console.log(Piece.Valid_Moves(game.chess.grid));
        return res.status(200).json(Piece.Valid_Moves(game.chess.grid));
    }
    // Ajouter return ici pour s'assurer que la fonction se termine
    return res.status(201).send("Not Piece");
});
app.post('/move', (req, res) => {
    // Traitez les données ici, req.body contiendra les données JSON
    console.log(req.body);
    console.log("\n")
    if (req.body.piece.piece !== null) {
        let game = GameEntity.fromJSON(req.body.board);
        game.chess.grid[req.body.pos_x][req.body.pos_y] = game.findPiece(req.body.piece.pos_x, req.body.piece.pos_y);
        game.chess.grid[req.body.pos_x][req.body.pos_y].pos_x=req.body.pos_x;
        game.chess.grid[req.body.pos_x][req.body.pos_y].pos_y=req.body.pos_y;
        game.chess.grid[req.body.piece.pos_x][req.body.piece.pos_y] =null;
        return res.status(200).json(game);
    }
    // Ajouter return ici pour s'assurer que la fonction se termine
    return res.status(201).send("Not Piece");
});
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });

    socket.on('message', (message) => {
        io.emit('message', message);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
