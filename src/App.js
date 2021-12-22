import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

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
  console.log(squares);

  return squares;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());

  const [currentSquare, setCurrentSquare] = useState(false);

  // Wave 2
  const changeTheSquare = (id) => {
    let newSquares = [];
    for (let row = 0; row < 3; row += 1) {
      newSquares.push([]);
      for (let col = 0; col < 3; col += 1) {
        if (id === squares[row][col].id) {
          if (!squares[row][col].value) {
            if (!currentSquare) {
              squares[row][col].value = PLAYER_1;
            } else {
              squares[row][col].value = PLAYER_2;
            }
            setCurrentSquare(!currentSquare);
          }
        }
        newSquares[row].push(squares[row][col]);
      }
    }
    setSquares(newSquares);
  };

  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const checkForWinner = () => {
    //check rows
    for (let row = 0; row < 3; row += 1) {
      let countX = 0;
      let countO = 0;
      for (let col = 0; col < 3; col += 1) {
        if (squares[row][col] === 'X') {
          countX += 1;
        } else if (squares[row][col] === 'O') {
          countO += 1;
        }
        if (countX === 3) {
          return 'X';
        }
        if (countO === 3) {
          return 'O';
        }
      }
    }
    //check columns
    for (let row = 0; row < 3; row += 1) {
      let countX = 0;
      let countO = 0;
      for (let col = 0; col < 3; col += 1) {
        if (squares[col][row] === 'X') {
          countX += 1;
        } else if (squares[col][row] === 'O') {
          countO += 1;
        }
        if (countX === 3) {
          return 'X';
        }
        if (countO === 3) {
          return 'O';
        }
      }
    }
    //Check dioganals
    if (squares[0][0] == 'X' && squares[1][1] == 'X' && squares[2][2] == 'X') {
      return 'X';
    }
    if (squares[0][0] == 'O' && squares[1][1] == 'O' && squares[2][2] == 'O') {
      return 'O';
    }
    // check other diagonal
    if (squares[2][0] == 'X' && squares[1][1] == 'X' && squares[0][2] == 'X') {
      return 'X';
    }
    if (squares[2][0] == 'O' && squares[1][1] == 'O' && squares[0][2] == 'O') {
      return 'O';
    }

    // check for a tie
    let count = 0;
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        if (squares[row][col] == 'X' || squares[row][col] == 'O') {
          count += 1;
        }
      }
    }
    if (count != 9) {
      return ' ';
    }
    return 'Tie';
  };

  // Complete in Wave 3
  // You will need to:
  // 1. Go accross each row to see if
  //    3 squares in the same row match
  //    i.e. same value
  // 2. Go down each column to see if
  //    3 squares in each column match
  // 3. Go across each diagonal to see if
  //    all three squares have the same value.

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
        <Board squares={squares} onClickCallback={changeTheSquare} />
      </main>
    </div>
  );
};

export default App;
