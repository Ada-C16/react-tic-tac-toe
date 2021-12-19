import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

// outer loop adds each row of squares
  for (let row = 0; row < 3; row += 1) {
    squares.push([]);

// inner loop adds individual squares within each row
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
  const [player, playerTurn] = useState(PLAYER_1);
  console.log(squares);

  // method to update state to board
  const onClickCallback = (id) => {
    const square = squares.map((oneSquare) => {
      for (const insideSquare of oneSquare) {
        if (insideSquare.id === id) {
          insideSquare.value = player;
        }
      }
      return oneSquare;
    });
    if (player === PLAYER_1) {
      playerTurn(PLAYER_2);
    }
    else {
      playerTurn(PLAYER_1);
    }
    setSquares(square);
  };


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
        <Board squares={squares} onClickCallback={onClickCallback}/> 
      </main>
    </div>
  );
};

export default App;