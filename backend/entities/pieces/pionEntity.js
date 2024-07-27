const PieceEntity = require("../PieceEntity");

class PionEntity extends PieceEntity{
        constructor(color) {
            super(color);
            if(this.color){
                this.pos_y=1;
                this.type='pawn-white'
            }
            else{
                this.pos_y=6;
                this.type='pawn-black'
            }
            this.hasMoved = false;

        }
    set_x(x){
        this.pos_x = x;
    }
    Valid_Moves(grid) {
        let res = [];
        let direction = this.color === true ? 1 : -1;

        // One square forward
        if (this.isWithinBounds(this.pos_x , this.pos_y+ direction) && grid[this.pos_x ][this.pos_y+ direction]===null ) {
            res.push([this.pos_x , this.pos_y+ direction]);
            console.log("gyugugyu")
            // Two squares forward if it hasn't moved yet
            if (!this.hasMoved && this.isWithinBounds(this.pos_x, this.pos_y + 2 * direction) && grid[this.pos_x ][this.pos_y + 2 * direction] == null) {
                res.push([this.pos_x, this.pos_y + 2 * direction]);
            }
        }

        // Capture diagonally left
        if (this.isWithinBounds(this.pos_x -1, this.pos_y + direction) && grid[this.pos_x -1][this.pos_y + direction] != null && grid[this.pos_x -1][this.pos_y + direction].color !== this.color) {
            res.push([this.pos_x -1, this.pos_y + direction]);
        }

        // Capture diagonally right
        if (this.isWithinBounds(this.pos_x +1, this.pos_y + direction) && grid[this.pos_x +1][this.pos_y + direction] != null && grid[this.pos_x +1][this.pos_y + direction].color !== this.color) {
            res.push([this.pos_x +1, this.pos_y + direction]);
        }

        return res;
    }
}
module.exports = PionEntity;