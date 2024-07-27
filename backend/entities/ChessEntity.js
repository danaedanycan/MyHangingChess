class ChessEntity {
    constructor() {
        this.grid = this.initializeGrid(8, 8);

    }

    initializeGrid(rows, cols) {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            const row = new Array(cols).fill(null);
            grid.push(row);
        }
        return grid;
    }


}

module.exports = ChessEntity;

