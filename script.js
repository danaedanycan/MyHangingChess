import {fetchConfig, fetchPossibleMoves, Move} from './request.js';
import {SetBoard} from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const boardElement = document.getElementById('board');
    const whiteCapturedPieces = document.getElementById('white-captured-pieces');
    const blackCapturedPieces = document.getElementById('black-captured-pieces');
    const pieces = {
        rook: {
            black: 'url(images/rook-black.svg)',
            white: 'url(images/rook-white.svg)'
        },
        knight: {
            black: 'url(images/knight-black.svg)',
            white: 'url(images/knight-white.svg)'
        },
        bishop: {
            black: 'url(images/bishop-black.svg)',
            white: 'url(images/bishop-white.svg)'
        },
        queen: {
            black: 'url(images/queen-black.svg)',
            white: 'url(images/queen-white.svg)'
        },
        king: {
            black: 'url(images/king-black.svg)',
            white: 'url(images/king-white.svg)'
        },
        pawn: {
            black: 'url(images/pawn-black.svg)',
            white: 'url(images/pawn-white.svg)'
        }
    };

    let Board = [];
    let ActualGame = null;
    let possible_moves = [];
    let selectedPiece = null;
    let currentPlayer = 'white';
    let whiteKingPosition = { row: 7, col: 4 };
    let blackKingPosition = { row: 0, col: 4 };

    function createSquare(row, col, pieceClass,cible) {
        const square = document.createElement('div');
        square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');

        if (pieceClass && !cible) {
            square.style.backgroundImage = pieces[pieceClass.split('-')[0]][pieceClass.split('-')[1]];

            square.classList.add('piece');
            square.setAttribute('data-piece', pieceClass);
        }
        else if(pieceClass ){
            console.log("fefef")
            square.style.backgroundImage='url(images/king-black.svg)\''
            square.classList.add('piece');
            square.setAttribute('data-piece', pieceClass);
        }

        square.addEventListener('click', async () => await handleSquareClick(row, col, square));

        return square;
    }
    function updateBoard(newBoard) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const pieceClass = newBoard[row][col];
                const square = boardElement.children[(7 - row) * 8 + (7 - col)];
                if (pieceClass) {
                    square.style.backgroundImage = pieces[pieceClass.split('-')[0]][pieceClass.split('-')[1]];
                    square.classList.add('piece');
                    square.setAttribute('data-piece', pieceClass);
                    for (let i = 0; i < possible_moves.length; i++) {
                        if (possible_moves[i][0] === row && possible_moves[i][1] === col) {
                            possible_moves.splice(i, 1);
                            break; // Ajuster l'index après la suppression
                        }
                    }
                } else {
                    square.style.backgroundImage = '';
                    square.classList.remove('piece');
                    square.removeAttribute('data-piece');
                    square.style.backgroundColor = (row + col) % 2 === 0 ? "var(--light-color)" : "var(--dark-color)";

                }
            }
        }
        if(selectedPiece)
        deselectPiece(selectedPiece.square);

     }
async function handleSquareClick(row, col, square) {
    const piece = square.getAttribute('data-piece');
    if(piece){

        await selectPiece(piece, row, col, square);
    }
    else{
        if(selectedPiece!==null){
            console.log("iciiiiiiiiiii");
            await updateBoard(Board);
            ActualGame=await Move(ActualGame,selectedPiece,row,col);
            Board=SetBoard(ActualGame);
            console.log(Board);
            await updateBoard(Board);
            selectedPiece=null

        }
    }


}

    async function selectPiece(piece, pos_x, pos_y, square) {
        if(selectedPiece){

            deselectPiece(selectedPiece.square)
            await updateBoard(Board);
        }
        selectedPiece = {piece, pos_x, pos_y, square};
        square.classList.add('selected');
        square.style.backgroundColor = 'blue';

        possible_moves = await fetchPossibleMoves(ActualGame, selectedPiece);

        for (let i = 0; i < possible_moves.length; i++) {
            console.log(possible_moves[i]);
            const newSquare = boardElement.children[(7-possible_moves[i][1]) * 8 + (7-possible_moves[i][0])];
            newSquare.style.backgroundImage = 'url(images/cible.png)';
            newSquare.classList.add('piece');
            //square.setAttribute('data-piece', "queen-white");
        }
    }

    function deselectPiece(square) {
        if (selectedPiece) {
            for (let i = 0; i < possible_moves.length; i++) {
                const newSquare = boardElement.children[(7 - possible_moves[i][1]) * 8 + (7 - possible_moves[i][0])];
                newSquare.style.backgroundImage = '';
                newSquare.classList.remove('piece');
                newSquare.removeAttribute('data-piece'); // Suppression de l'attribut data-piece sur newSquare
            }
            selectedPiece.square.classList.remove('selected');
            const row = selectedPiece.row;
            const col = selectedPiece.col;
            console.log("Try to color square");
            square.backgroundColor = (row + col) % 2 === 0 ? "var(--light-color)" : "var(--dark-color)";
            selectedPiece.square.style.backgroundColor = ((row + col) % 2 === 0) ? "var(--light-color)" : "var(--dark-color)";

        }
    }


    if (Board.length === 0) {
        ActualGame=await fetchConfig(ActualGame);
        Board=SetBoard(ActualGame);
    }
    for (let row = 7; row >= 0; row--) {
        for (let col = 7; col >=0; col--) {
            const pieceClass = Board[row][col];
            const square = createSquare(col, row, pieceClass,false);
            boardElement.appendChild(square);
        }
    }

    /*for (let row = 0; row < 8; row++) {
=======
    function playCaptureSound() {
        const audio = new Audio('sound/capture-sound.mp3');
        audio.play();
    }

    function playCheckSound() {
        const audio = new Audio('sound/check-sound.mp3');
        audio.play();
    }

    function playCheckmateSound() {
        const audio = new Audio('sound/checkmate-sound.mp3');
        audio.play();
    }

    function isNextToOpponentKing(newRow, newCol) {
        const kingPosition = currentPlayer === 'white' ? blackKingPosition : whiteKingPosition;
        return Math.abs(newRow - kingPosition.row) <= 1 && Math.abs(newCol - kingPosition.col) <= 1;
    }

    function isInCheck(kingPosition) {
        // Check if the king is in check
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = boardElement.children[row * 8 + col].getAttribute('data-piece');
                if (piece && piece.split('-')[1] !== currentPlayer) {
                    if (canCapture({ piece, row, col }, kingPosition.row, kingPosition.col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function isCheckmate() {
        // Check if the current player's king is in checkmate
        const kingPosition = currentPlayer === 'white' ? whiteKingPosition : blackKingPosition;
        if (!isInCheck(kingPosition)) {
            return false;
        }
        // Check if the king can move to any adjacent square to escape check
        const moves = [
            { row: kingPosition.row + 1, col: kingPosition.col },
            { row: kingPosition.row - 1, col: kingPosition.col },
            { row: kingPosition.row, col: kingPosition.col + 1 },
            { row: kingPosition.row, col: kingPosition.col - 1 },
            { row: kingPosition.row + 1, col: kingPosition.col + 1 },
            { row: kingPosition.row + 1, col: kingPosition.col - 1 },
            { row: kingPosition.row - 1, col: kingPosition.col + 1 },
            { row: kingPosition.row - 1, col: kingPosition.col - 1 }
        ];
        for (const move of moves) {
            if (isValidMove({ piece: `king-${currentPlayer}`, row: kingPosition.row, col: kingPosition.col }, move.row, move.col) &&
                !isInCheck(move)) {
                return false;
            }
        }
        return true;
    }

    function canCapture(piece, newRow, newCol) {
        return isValidMove(piece, newRow, newCol);
    }

    function updateCapturedPieces(piece) {
        const color = piece.split('-')[1];
        const img = document.createElement('img');
        img.src = `images/${piece.split('-')[0]}-${color}.svg`;
        if (color === 'white') {
            whiteCapturedPieces.appendChild(img);
        } else {
            blackCapturedPieces.appendChild(img);
        }
    }

    for (let row = 0; row < 8; row++) {
>>>>>>> b79cc1e5bd32722b994ff2657231c8e2ff379090
        for (let col = 0; col < 8; col++) {
            const pieceClass = initialBoard[row][col];
            const square = createSquare(row, col, pieceClass);
            boardElement.appendChild(square);
        }
    }*/
});

