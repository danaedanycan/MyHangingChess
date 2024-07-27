const PieceEntity = require("../PieceEntity");

class RoiEntity extends PieceEntity{
    constructor(color) {
        super(color);
        this.pos_x = 3;
        this.hasMoved = false;
        if(color){
            this.type='king-white'
        }
        else
        {
            this.type='king-black'
        }
    }
    isProtectedByEnemy(grid, x, y) {

        let sauv = grid[x][y];
        grid[x][y] = null;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] != null && grid[i][j].color !== this.color) {
                    let moves = grid[i][j].Valid_Moves(grid);
                    for (let move of moves) {
                        if (move[0] === x && move[1] === y) {
                            grid[x][y] = sauv;
                            return true;
                        }
                    }
                }
            }
        }
        grid[x][y] = sauv;
        return false;
    }

    Valid_Moves(grid) {
        let res = [];
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

        for (const direction of directions) {
            let x = this.pos_x + direction.dx;
            let y = this.pos_y + direction.dy;

            if (this.isWithinBounds(x, y) && !this.isProtectedByEnemy(grid, x, y)) {
                if (grid[x][y] == null || grid[x][y].color !== this.color) {
                    res.push([x, y]);
                }
            }
        }
        if (!this.hasMoved && !this.isProtectedByEnemy(grid, this.pos_x, this.pos_y)) {
            // King-side castling
            if (grid[this.pos_x][this.pos_y + 3] instanceof TourEntity && !grid[this.pos_x][this.pos_y + 3].hasMoved) {
                if (grid[this.pos_x][this.pos_y + 1] == null && grid[this.pos_x][this.pos_y + 2] == null &&
                    !this.isProtectedByEnemy(grid, this.pos_x, this.pos_y + 1) &&
                    !this.isProtectedByEnemy(grid, this.pos_x, this.pos_y + 2)) {
                    res.push([this.pos_x, this.pos_y + 2]);
                }
            }

            // Queen-side castling
            if (grid[this.pos_x][this.pos_y - 4] instanceof TourEntity && !grid[this.pos_x][this.pos_y - 4].hasMoved) {
                if (grid[this.pos_x][this.pos_y - 1] == null && grid[this.pos_x][this.pos_y - 2] == null && grid[this.pos_x][this.pos_y - 3] == null &&
                    !this.isProtectedByEnemy(grid, this.pos_x, this.pos_y - 1) &&
                    !this.isProtectedByEnemy(grid, this.pos_x, this.pos_y - 2)) {
                    res.push([this.pos_x, this.pos_y - 2]);
                }
            }
        }
        return res;
    }
}

module.exports = RoiEntity;