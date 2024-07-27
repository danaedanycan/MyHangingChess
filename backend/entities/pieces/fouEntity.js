const PieceEntity = require("../PieceEntity");

class fouEntity extends PieceEntity{

    constructor(color) {
        super(color);
        if(color){
            this.type = "bishop-white";
        }
        else{
            this.type = "bishop-black";
        }
    }
    set_x(x){
        if(x===0){
            this.pos_x = 2;
        }
        else{
            this.pos_x = 5;
        }
    }
    Valid_Moves(grid) {

        const directions = [
            { dx: 1, dy: 1 },  // up-right diagonal
            { dx: -1, dy: -1 }, // down-left diagonal
            { dx: 1, dy: -1 },  // down-right diagonal
            { dx: -1, dy: 1 }   // up-left diagonal
        ];

        return this.Checkdirections(grid, directions);
    }

}
module.exports = fouEntity;