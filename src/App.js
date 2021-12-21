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
  let [winner, checkWinner] = useState('');

  // function to update state to board
  const onClickCallback = (id) => {
    
  if (winner) {
    return;
  }

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
    checkWinner(checkForWinner());
  };


  const checkForWinner = () => {
    let row = 0;
    let col = 0;
    // check for winning combo in rows
    while (row < 3) {
      if (
        squares[row][0].value === squares[row][1].value &&
        squares[row][2].value === squares[row][1].value &&
        squares[row][0].value != ''
      ) {
        return squares[row][0].value;
      } else row += 1;
    }
    // check for winning combo in columns
    while (col < 3) {
      if (
        squares[0][col].value === squares[1][col].value &&
        squares[2][col].value === squares[1][col].value &&
        squares[0][col].value != ''
      ) {
        return squares[0][col].value;
      } else col += 1;
    }
    // check for winning combo diagonally
    if (
      squares[0][0].value === squares[1][1].value &&
      squares[2][2].value === squares[1][1].value &&
      squares[0][0] != ''
    ) {
      return squares[0][0].value;
    } else if (
      squares[0][2].value === squares[1][1].value &&
      squares[2][0].value === squares[1][1].value &&
      squares[0][2] != ''
    ) {
      return squares[0][2].value;
    } else {
      for (let array of squares) {
        for (let element of array) {
          if (element.value == '') {
            return '';
          }
          continue;
        }
      }
      return 'Tie';
    }
  };


  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... {winner} </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/> 
      </main>
    </div>
  );
};

export default App;