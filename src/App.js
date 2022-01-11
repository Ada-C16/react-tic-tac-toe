import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const player1 = 'X';
const player2 = 'O';

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
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());

  const [isX, setIsX] = useState(false);

  const currentPlayer = !isX ? player1 : player2;

  const updateSquare = (id) => {
    let newSquares = [];

    for (let row = 0; row < 3; row += 1) {
      newSquares.push([]);
      for (let col = 0; col < 3; col += 1) {
        if (id === squares[row][col].id) {
          if (!squares[row][col].value) {
            squares[row][col].value = currentPlayer;
            setIsX(!isX);
          }
        }
        newSquares[row].push(squares[row][col]);
      }
    }
    setSquares(newSquares);
  };

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

  const resetGame = () => {
    setSquares(generateSquares());
  };

  const headerMessage = checkForWinner() ? `The winner is ${checkForWinner()}!!!` : `Current player: ${currentPlayer}`;

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>TIC-TAC-TOE</h1>
        <h2>{headerMessage}</h2>
        <button onClick={resetGame}>reset</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={checkForWinner() ? () => {} : updateSquare} />
      </main>
    </div>
  );
};

export default App;
