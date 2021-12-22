import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';
import Square from './components/Square';

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

  return squares;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, updateSquares] = useState(generateSquares());
  // keeping track of players
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  // find winner
  const [winner, setWinner] = useState(null);

  const checkSquare = (id) => {
    for (let row of squares) {
      for (let square of row) {
        if (square.id === id && square.value === '') {
          if (currentPlayer === PLAYER_1) {
            square.value = PLAYER_1;
          } else if (currentPlayer === PLAYER_2) {
            square.value = PLAYER_2;
          }
          if (currentPlayer === PLAYER_1) {
            setCurrentPlayer(PLAYER_2);
          } else {
            setCurrentPlayer(PLAYER_1);
          }
          console.log({ squareId: id });
        }
      }
    }
    const squareCopy = [...squares];
    updateSquares(squareCopy);
    setWinner(checkForWinner());
    return id;
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
    if (
      squares[0][0].value === squares[1][1].value &&
      squares[2][2].value === squares[1][1].value &&
      squares[1][1].value !== ''
    ) {
      return squares[0][0].value;
    }

    if (
      squares[0][2].value === squares[1][1].value &&
      squares[2][0].value === squares[1][1].value &&
      squares[1][1].value !== ''
    ) {
      return squares[0][2].value;
    }
    //check for Tie
    const playsCheck = { PLAYER_1: 0, PLAYER_2: 0 };
    for (let row of squares) {
      for (let play of row) {
        playsCheck[play]++;
      }
      if (playsCheck[PLAYER_1] === 5 || playsCheck[PLAYER_2] === 5) {
        return 'tie';
      }
    }
    return null;
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

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner} </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={checkSquare} />
      </main>
    </div>
  );
};

export default App;
