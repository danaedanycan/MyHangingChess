const RoiEntity = require('./pieces/RoiEntity');
const dameEntity = require("./pieces/dameEntity");
const TourEntity = require("./pieces/tourEntity");
const fouEntity = require("./pieces/fouEntity");
const CavalierEntity = require("./pieces/cavalierEntity");
const PionEntity = require("./pieces/pionEntity");
const PieceEntity = require("./PieceEntity");
class PlayerEntity {

    constructor(name, ip,color) {
        this.name = name;
        this.ip = ip;
        this.color = color;
        this.Pieces = this.newSetPiece(this.color);
        this.Score = 0;
        this.EatedPieces = [];
        this.Coups = [];

    }
    getPieces(){
        return this.Pieces;
    }
    newSetPiece(color) {
        let res = [];
        res.push(new RoiEntity(color));
        res.push(new dameEntity(color));

        //tours
        let newPiece = new TourEntity(color);
        newPiece.set_x(0);
        res.push(newPiece);
        newPiece = new TourEntity(color);
        newPiece.set_x(1);
        res.push(newPiece);

        //fous
        newPiece = new fouEntity(color);
        newPiece.set_x(0);
        res.push(newPiece);
        newPiece = new fouEntity(color);
        newPiece.set_x(1);
        res.push(newPiece);

        //cavaliers
        newPiece = new CavalierEntity(color);
        newPiece.set_x(0);
        res.push(newPiece);
        newPiece = new CavalierEntity(color);
        newPiece.set_x(1);
        res.push(newPiece);

        //pions
        for (let i = 0; i < 8; i++) {
            let newPion = new PionEntity(color);
            newPion.set_x(i);
            res.push(newPion);
        }
        return res;
    }
}
module.exports = PlayerEntity;