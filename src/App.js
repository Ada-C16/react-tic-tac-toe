/* eslint-disable camelcase */
import { COMPARISON_BINARY_OPERATORS } from '@babel/types';
import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  // [[abc],[xyz]]

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

  const player_1 = 'x';
  const player_2 = 'o';

  const [currentPlayer, setNextPlayer] = useState(player_1);
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback


  const updateGameState = (id) => {
    // if checkForWinner returns a value, exit out of the function
    if (checkForWinner()) {
      return;
    }

    // spread makes a copy of the squares/board
    const newBoard = [...squares];
    newBoard.map((array) => {
      return array.map((square) => {
        if (
          id === square.id &&
          //check if sqaure value is not x
          //!square.value === player_1 || x
          //
          //!square.value === player_2 ||// O
          square.value === '' // VALUE= ""
        ) {
          //check if the cuurent player is X
          if (currentPlayer === player_1) {
            // if player is X then after the turn make the player O
            square.value = player_1; //turn
            setNextPlayer(player_2);
          } else {
            square.value = player_2;
            setNextPlayer(player_1);
          }
        }
      });
    });
    //update the squares array with latest values and show in UI
    setSquares(newBoard);
  };
  // checkForWinner looks for 3 squares that have the same value
  // if a player has 3 in a row, then the function returns the winner (value = 'x' or 'o')
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
    // Complete in Wave 4
    return setSquares(generateSquares());
  };

  let displayNameAndWInner = 'Draw';

  if (checkForWinner()) {
    //x or o
    displayNameAndWInner = `Winner is ${checkForWinner()}`;
  } else if (!checkForWinner()) {
    displayNameAndWInner = `Current player is ${currentPlayer}`;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>

        <h2>{displayNameAndWInner}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateGameState} />
      </main>
    </div>
  );
};

export default App;

// ternary opeartors
// template literals
// destructuring in detail
// rest operator
// spread operator