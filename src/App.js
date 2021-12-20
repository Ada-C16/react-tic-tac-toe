import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const player1 = 'x';
const player2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
        key: currentId,
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
  const [player1, togglePlayer1] = useState(true);
  const [gameover, checkGame] = useState(false);

  const togglePlayers = () => {
    if (player1 === true) {
      togglePlayer1(false);
    } else {
      togglePlayer1(true);
    }
  };
  const onClickCallback = (squareToMark) => {
    // console.log(squareToMark);
    const newboard = [...squares];
    // console.log(newboard);
    if (!gameover) {
      newboard.map((row) => {
        row.map((square) => {
          if (square.id === squareToMark) {
            // console.log(squareToMark);
            if (player1 === true) {
              square.value = 'X';
              togglePlayers();
              return {
                id: square.id,
                value: 'X',
                key: square.id,
              };
            } else {
              square.value = 'O';
              togglePlayers();
              console.log(square);
              return square;
            }
          }
          return square;
        });
      });
    }
    // console.log(newboard);
    setSquares(newboard);
    if (checkForWinner()) {
      checkGame(`The winner is ${checkForWinner()}`);
    }
  };

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

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
    togglePlayer1(true);
    checkGame(false);
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{gameover} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
