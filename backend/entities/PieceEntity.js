class PieceEntity {
    pos_y;
    pos_x;
    constructor(color) {
        this.color = color;
        if(this.color){
            this.pos_y=0;
        }
        else{
            this.pos_y=7;
        }
    }
    isWithinBounds(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }

    isOccupiedByEnemy(grid, x, y) {
        return grid[x][y] !== null && grid[x][y].color !== this.color;
    }
    Checkdirections(grid, directions) {
        let res = [];
        for (const direction of directions) {
            let x = this.pos_x + direction.dx;
            let y = this.pos_y + direction.dy;

            while (this.isWithinBounds(x, y)) {
                if (grid[x][y] != null) {
                    if (this.isOccupiedByEnemy(grid, x, y)) {
                        res.push([x, y]);
                    }
                    break;
                }
                res.push([x, y]);
                x += direction.dx;
                y += direction.dy;
            }
        }
        return res;
    }
}

module.exports = PieceEntity;