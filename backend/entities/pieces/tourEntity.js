const PieceEntity = require("../PieceEntity");

class TourEntity extends PieceEntity{

    constructor(color) {
        super(color);
        if(color){
            this.type='rook-white'
        }
        else{
            this.type='rook-black'
        }
    }
    set_x(x){
        if(x===0){
            this.pos_x = 0;
        }
        else{
            this.pos_x = 7;
        }
        this.hasMoved = false;
    }
    Valid_Moves(grid) {

        const directions = [
            { dx: 1, dy: 0 },  // right
            { dx: -1, dy: 0 }, // left
            { dx: 0, dy: 1 },  // up
            { dx: 0, dy: -1 }, // down
        ];

        return this.Checkdirections(grid, directions);
    }
}

module.exports = TourEntity;