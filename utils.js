export function SetBoard(data){
    let Bo = Array.from({ length: 8 }, () => Array(8).fill(''));
    data.chess.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell) {
                Bo[cell.pos_x][cell.pos_y] = cell.type;
            }
        });
    });
    Bo=transpose(Bo)
    return Bo;
}

export function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposedMatrix = [];

    for (let i = 0; i < cols; i++) {
        transposedMatrix[i] = [];
        for (let j = 0; j < rows; j++) {
            transposedMatrix[i][j] = matrix[j][i];
        }
    }

    return transposedMatrix;
}