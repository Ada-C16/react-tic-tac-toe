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
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  // Should have a board with 9 squares
  // App -> Board -> [Square, Square, Square, Square, Square, Square, Square, Square, Square]
  const [squares, setSquares] = useState(generateSquares());

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
  };

  const onClickCallback = (id) => {
    setSquares((squares) => {
      let newBoard = squares.map((square)=>{
        for (let property of square){
          if (property.id === id && property.value === ''){
            if (currentPlayer === PLAYER_1){
              property.value = PLAYER_1;
            } else if (currentPlayer === PLAYER_2){
              property.value = PLAYER_2;
            }
          }
        }
        return square;
      });
      // Check for winner
      return newBoard;
    });
    if (currentPlayer === PLAYER_1){
      setCurrentPlayer(PLAYER_2);
    } else {
      setCurrentPlayer(PLAYER_1);
    }
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
        <Board squares={squares} />
      </main>
    </div>
  );
};

export default App;
