const PieceEntity = require("../PieceEntity");

class dameEntity extends PieceEntity {
    constructor(color) {
        super(color);
        this.pos_x = 4;
        if(color){
            this.type="queen-white"
        }
        else{
            this.type = 'queen-black'
        }
    }

    Valid_Moves(grid) {

        const directions = [
            { dx: 1, dy: 0 },  // right
            { dx: -1, dy: 0 }, // left
            { dx: 0, dy: 1 },  // up
            { dx: 0, dy: -1 }, // down
            { dx: 1, dy: 1 },  // up-right diagonal
            { dx: -1, dy: -1 }, // down-left diagonal
            { dx: 1, dy: -1 },  // down-right diagonal
            { dx: -1, dy: 1 }   // up-left diagonal
        ];

        return this.Checkdirections(grid, directions);
    }

}
module.exports = dameEntity;
