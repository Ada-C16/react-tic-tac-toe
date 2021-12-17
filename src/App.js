import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

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
  // This state starts off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, updateSquares] = useState(generateSquares());
  const [currentPlayer, updateCurrentPlayer] = useState(PLAYER_1);

  const updateSquare = (id) => {
    const newSquares = squares.map((row) => {
      return row.map((square) => {
        if (square.id === id) {
          return {
            id: square.id,
            value: currentPlayer,
          };
        }
        return square;
      });
    });
    updateSquares(newSquares);
    updateCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const checkForWinner = () => {
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if
    //    all three squares have the same value.
    for (let row of squares) {
      const firstSquare = row[0].value;
      const secondSquare = row[1].value;
      const thirdSquare = row[2].value;
      if (firstSquare && firstSquare === secondSquare && thirdSquare === firstSquare){
        return firstSquare;
      }
    }
    for (let i = 0; i < 3; i++) {
      // for i in range(3)
      // i = 0
      // while i < 3
      // do stuff
      // i+= 1
      const firstRow = squares[0];
      const secondRow = squares[1];
      const thirdRow = squares[2];

      const firstSquare = firstRow[i];
      const secondSquare = secondRow[i];
      const thirdSquare = thirdRow[i];
      // const firstSquare = squares[0][i]
      // const secondSquare = squares[1][i]

    } 


    /*
    [
      0 [0, 1, 2],
      1 [0, 1, 2],
      2 [0, 1, 2]
    ]


    */

  };

  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board onClickCallback={updateSquare} squares={squares} />
      </main>
    </div>
  );
};

export default App;
