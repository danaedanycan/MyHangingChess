const ChessEntity = require('./ChessEntity');
const PlayerEntity = require("./PlayerEntity");
const PionEntity = require("./pieces/pionEntity");
const fouEntity = require("./pieces/fouEntity");
const CavalierEntity = require("./pieces/cavalierEntity");
const TourEntity = require("./pieces/tourEntity");
const DameEntity = require("./pieces/dameEntity");
const RoiEntity = require("./pieces/roiEntity");

class GameEntity {
    nbplayer = 0;

    constructor() {
        //this.pendu = new PenduEntity();
        this.chess = new ChessEntity();
        this.player1 = new PlayerEntity("cyril","",true);
        this.nbplayer++;
        this.player2 = new PlayerEntity("danae","",false);
        this.nbplayer++;

        for (let i = 0; i <this.player1.getPieces().length; i++) {
            //console.log(this.player1.Pieces[i])
            this.chess.grid[this.player1.Pieces[i].pos_x][this.player1.Pieces[i].pos_y]=this.player1.Pieces[i];
        }
        for (let i = 0; i <this.player2.getPieces().length; i++) {
            //console.log(this.player2.Pieces[i])
            this.chess.grid[this.player2.Pieces[i].pos_x][this.player2.Pieces[i].pos_y]=this.player2.Pieces[i];
        }

    }

    static fromJSON(json) {
        const chess = Object.assign(new ChessEntity(), json.chess);
        const player1 = Object.assign(new PlayerEntity(json.player1.name, json.player1.ip, json.player1.color), json.player1);
        const player2 = Object.assign(new PlayerEntity(json.player2.name, json.player2.ip, json.player2.color), json.player2);
        let game = new GameEntity();
        game.chess=chess;
        game.player1 = player1;
        game.player2 = player2;
        game.nbplayer = json.nbplayer;
        player1.Pieces = json.player1.Pieces.map(pieceData => {
            // Assuming pieces have a type property to distinguish them
            if (pieceData.type === 'pawn-white') {
                return Object.assign(new PionEntity(player1.color), pieceData);
            } else if (pieceData.type === 'bishop-white') {
                return Object.assign(new fouEntity(player1.color), pieceData);
            }else if(pieceData.type === 'knight-white') {
                return Object.assign(new CavalierEntity(player1.color), pieceData);
            }else if(pieceData.type === 'rook-white') {
                return Object.assign(new TourEntity(player1.color), pieceData);
            }else if(pieceData.type === 'queen-white') {
                return Object.assign(new DameEntity(player1.color), pieceData);
            }else if(pieceData.type === 'king-white') {
                return Object.assign(new RoiEntity(player1.color), pieceData);
        }
            // Add other piece types here
        });

        player2.Pieces = json.player2.Pieces.map(pieceData => {
            if (pieceData.type === 'pawn-black') {
                return Object.assign(new PionEntity(player2.color), pieceData);
            } else if (pieceData.type === 'bishop-black') {
                return Object.assign(new fouEntity(player2.color), pieceData);
            }else if(pieceData.type === 'knight-black') {
                return Object.assign(new CavalierEntity(player2.color), pieceData);
            }else if(pieceData.type === 'rook-black') {
                return Object.assign(new TourEntity(player2.color), pieceData);
            }else if(pieceData.type === 'queen-black') {
                return Object.assign(new DameEntity(player2.color), pieceData);
            }else if(pieceData.type === 'king-black') {
                return Object.assign(new RoiEntity(player2.color), pieceData);
            }
            // Add other piece types here
        });


        //console.log(game.chess.grid)
        return game;
    }
    findPiece(pos_x, pos_y) {
        const piece = this.player1.getPieces().concat(this.player2.getPieces()).find(
            piece => piece.pos_x === pos_x && piece.pos_y === pos_y
        );
        return piece;
    }
}

module.exports = GameEntity;