const PieceEntity = require("../PieceEntity");

class CavalierEntity extends PieceEntity{
    constructor(color) {
        super(color);
        if(color){
            this.type='knight-white'
        }
        else{
            this.type='knight-black'
        }
    }
    set_x(x){
        if(x===0){
            this.pos_x = 1;
        }
        else{
            this.pos_x = 6;
        }
    }
    Valid_Moves(grid) {
        let res = [];
        let possibleMoves = [
            [this.pos_x + 2, this.pos_y + 1],
            [this.pos_x + 2, this.pos_y - 1],
            [this.pos_x - 2, this.pos_y + 1],
            [this.pos_x - 2, this.pos_y - 1],
            [this.pos_x + 1, this.pos_y + 2],
            [this.pos_x + 1, this.pos_y - 2],
            [this.pos_x - 1, this.pos_y + 2],
            [this.pos_x - 1, this.pos_y - 2]
        ];

        for (let move of possibleMoves) {
            let [x, y] = move;
            if (this.isWithinBounds(x, y) && (grid[x][y] == null || this.isOccupiedByEnemy(grid, x, y))) {
                res.push([x, y]);
            }
        }

        return res;
    }
}
module.exports = CavalierEntity;