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

  const player_1 = 'X';
  const player_2 = 'O';

  const [currentPlayer, setNextPlayer] = useState(player_1);
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback


  const requiredFunction = (id) => {
    const newBoard = [...squares];
    //square [array, array, array] => [{id, value}]
    newBoard.map(function (array) {
      return array.map(function (square) {
        console.log('find', square.id === id);
        //inside the square object

        if (
          id === square.id &&
          (!square.value === player_1 ||
            !square.value === player_2 ||
            square.value === '')
        ) {
          //check if the cuurent player is X
          if (currentPlayer === player_1) {
            square.value = player_1; //turn
            // if player is X then after the turn make the player O
            setNextPlayer(player_2);
          } else {
            square.value = player_2;
            setNextPlayer(player_1);
          }
        }
      });
    });
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

  console.log('squares asd', checkForWinner());

  const resetGame = () => {
    // Complete in Wave 4
    return setSquares(generateSquares());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>

        <h2>The winner is wave3</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={requiredFunction} />
      </main>
    </div>
  );
};

export default App;
