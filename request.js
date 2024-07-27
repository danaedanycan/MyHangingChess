import {transpose} from "./utils.js";

export async function fetchConfig(Game) {
    try {
        const response = await fetch('http://localhost:4000/creategame');
        if (response.ok) {
            Game=await response.json();

        } else {
            console.error('Failed to fetch:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    return Game;
}

export async function fetchPossibleMoves(Board, Piece) {
    console.log(Piece);
    let res = [];
    try {
        const requestBody = {
            board: Board,
            piece: Piece
        };
        const response = await fetch('http://localhost:4000/getvalidmove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)  // Convertir l'objet Piece en JSON
        });

        if (response.status ===200) {
            const data = await response.json();
            console.log(data);

            // Ajouter les éléments de data dans res
            res.push(...data);

        } else if (response.status === 201) {
            const message = await response.text();  // Lire la réponse en tant que texte
            console.log(message);  // Devrait afficher "Not Piece"
        } else {
            console.error('Failed to fetch:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    console.log(res);
    return res;
}



export async function Move(Board, Piece,pos_x,pos_y) {
    console.log(Piece);
    let res = [];
    try {
        const requestBody = {
            board: Board,
            piece: Piece,
            pos_x: pos_x,
            pos_y: pos_y
        };
        const response = await fetch('http://localhost:4000/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)  // Convertir l'objet Piece en JSON
        });

        if (response.status ===200) {
            const data = await response.json();
            console.log(data);
            res= data
            // Ajouter les éléments de data dans res
            //res.push(...data);

        } else if (response.status === 201) {
            const message = await response.text();  // Lire la réponse en tant que texte
            console.log(message);  // Devrait afficher "Not Piece"
        } else {
            console.error('Failed to fetch:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    //console.log(res);
    return res;
}