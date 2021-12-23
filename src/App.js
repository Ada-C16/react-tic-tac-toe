import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];
  let row = 0;
  let col = 0;
  let currentId = 0;

  while (row < 3) {
    squares.push([]);
    while (col < 3) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      col += 1;
      currentId += 1;
    }
    row += 1;
    col = 0;
  }

  return squares;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.

  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setSquareValue] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);
  const [count, setCount] = useState(1);

  const updateSquares = (id) => {
    if (winner !== null) {
      return null;
    }

    const newSquares = [...squares];
    let row = 0;
    let col = 0;
    let found = false;

    while (row < 3 && found == false) {
      while (col < 3 && found === false) {
        let currentSquare = newSquares[row][col];
        if (currentSquare.id === id) {
          if (currentSquare.value !== '') {
            return null;
          }
          setCount(count + 1);
          console.log(count);
          currentSquare.value = currentPlayer;
          found = true;

          if (currentPlayer === PLAYER_1) {
            setSquareValue(PLAYER_2);
          } else {
            setSquareValue(PLAYER_1);
          }
        }
        col += 1;
      }
      row += 1;
      col = 0;
    }
    setWinner(checkForWinner());
    setSquares(newSquares);
  };

  const checkForWinner = () => {
    // Check all the rows and columns for a winner
    for (let i = 0; i < 3; i++) {
      //// checks columns
      if (
        squares[0][i]['value'] == squares[1][i]['value'] &&
        squares[1][i]['value'] == squares[2][i]['value'] &&
        squares[0][i]['value'] != ''
      ) {
        return squares[0][i]['value'];
      } else if (
        //// checks rows
        squares[i][0]['value'] == squares[i][1]['value'] &&
        squares[i][0]['value'] == squares[i][2]['value'] &&
        squares[i][0]['value'] != ''
      ) {
        return squares[i][0]['value'];
      }
    }
    ////// checks diagonals
    if (
      squares[0][0]['value'] == squares[1][1]['value'] &&
      squares[0][0]['value'] == squares[2][2]['value'] &&
      squares[0][0]['value'] != ''
    ) {
      return squares[0][0]['value'];
    }
    if (
      squares[0][2]['value'] == squares[1][1]['value'] &&
      squares[0][2]['value'] == squares[2][0]['value'] &&
      squares[0][2]['value'] != ''
    ) {
      return squares[0][2]['value'];
    }
    return null;
  };

  const resetGame = () => {
    setSquares(generateSquares());
    setSquareValue(PLAYER_1);
    setCount(0);
    setWinner(null);
  };

  const playerStatus = () => {
    if (winner != null) {
      return `Winner is ${winner}`;
    } else if (!winner && count === 9) {
      return 'It is a Tie';
    } else {
      return `Current Player ${currentPlayer}`;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{playerStatus()}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquares} />
      </main>
    </div>
  );
};
export default App;
