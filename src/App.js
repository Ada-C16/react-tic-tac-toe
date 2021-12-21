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
  const [player, setPlayer] = useState(true);

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const updateSquares = (id) => {
    const updatedSquareData = squares.map((row) => {
      return row.map((square) => {
        if (square.id === id) {
          if (player) {
            square.value = PLAYER_1;
          } else {
            square.value = PLAYER_2;
          }
          console.log(square.value);
        }
        return square;
      });
    });

    setSquares(updatedSquareData);
    setPlayer(!player);
    const winner = checkForWinner(updatedSquareData);
    console.log(winner);
  };

  const checkForWinner = (boardArrays) => {
    let tieValue = 0;
    for (let i = 0; i < 3; i++) {
      if (boardArrays[i][0].value == boardArrays[i][1].value && 
        boardArrays[i][1].value == boardArrays[i][2].value &&
        boardArrays[i][0].value != '') {
        return boardArrays[i][0].value;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (boardArrays[0][i].value == boardArrays[1][i].value &&
        boardArrays[1][i].value == boardArrays[2][i].value &&
        boardArrays[0][i].value != '') {
        return boardArrays[0][i].value;
        }
      if (boardArrays[i][0].value != '' &&
        boardArrays[i][1].value != '' &&
        boardArrays[i][2].value != '') {
          tieValue +=1;
      }
    }
    if (boardArrays[0][0].value == boardArrays[1][1].value &&
      boardArrays[1][1].value == boardArrays[2][2].value &&
      boardArrays[0][0].value != '') {
        return boardArrays[0][0].value;
      }
    if (boardArrays[0][2].value == boardArrays[1][1].value &&
      boardArrays[1][1].value == boardArrays[2][0].value &&
      boardArrays[0][2].value != '') {
        return boardArrays[0][2].value;
      }
  if (tieValue == 3) {
    return 'Tie';
  }
  return '';
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
        <Board squares={squares} updateSquares={updateSquares} />
      </main>
    </div>
  );
};

export default App;
