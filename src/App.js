import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';
// const isPlayedIn = PLAYER_1;


// creates a 2D array of JS objects with empty value and unique ids
const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
};



const App = () => {

  // useState
  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(false);
  const [isTied, setIsTied] = useState(false);

  
  const markSquare = (clickedSquare) => {
    if (clickedSquare.value == '') {
      const playedInSquares = squares.map((row) => {
        row.map((square) => {
          if (square.id === clickedSquare.id) {
            square.value = player;
          }
          return square;
        });
        return row;
      });
      setSquares(playedInSquares);
      setPlayer(player === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    }



  const checkForWinner = () => {
    let i = 0;

    // Check all the rows and columns for a winner
    while (i < 3) {
      if (
        squares[i][0].value === squares[i][1].value &&
        squares[i][2].value === squares[i][1].value &&
        squares[i][0].value !== ''
      ) {
        return squares[i][0].value;
      } else if (
        squares[0][i].value === squares[1][i].value &&
        squares[2][i].value === squares[1][i].value &&
        squares[0][i].value !== ''
      ) {
        return squares[0][i].value;
      }
      i += 1;
    }
    // Check Top-Left to bottom-right diagonal
    if (
      squares[0][0].value === squares[1][1].value &&
      squares[2][2].value === squares[1][1].value &&
      squares[1][1].value !== ''
    ) {
      return squares[0][0].value;
    }

    // Check Top-right to bottom-left diagonal
    if (
      squares[0][2].value === squares[1][1].value &&
      squares[2][0].value === squares[1][1].value &&
      squares[1][1].value !== ''
    ) {
      return squares[0][2].value;
    }

    return null;
  };
  
  const updateBoard = () => {
  

  
      const winner = checkForWinner();
    
      const checkForTie = () => {
  const resetGame = () => {
    // Complete in Wave 4
  };

  // ========= App rendered ===========

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} />
      </main>
    </div>
  );
};

export default App;
