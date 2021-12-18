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
  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(PLAYER_1);

  const onClickCallback = (id) => {
    const boardCopy = squares.map((square) => {
      for (let properties of square) {
        if (properties.id === id) {
          if (player === PLAYER_1) {
            properties.value = PLAYER_1;
          } else {
            properties.value = PLAYER_2;
          }
        }
        return square;
      }
    });
    setSquares(boardCopy);
    if (player === PLAYER_1) {
      setPlayer(PLAYER_2);
    } else {
      setPlayer(PLAYER_1);
    }
  };

  // const boardCopy = [];

  // for (let square of squares) {
  //   if (id === square.id) {
  //     if (player === PLAYER_1) {
  //       square.value = PLAYER_1;
  //       boardCopy.push(square);
  //     } else {
  //       square.value = PLAYER_2;
  //       boardCopy.push(square);
  //     }
  //   } else {
  //     boardCopy.push(square);
  //   }
  // }

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
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
