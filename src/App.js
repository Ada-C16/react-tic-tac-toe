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
  const [winner, setWinner] = useState('...');

  const onSquareClickCallback = (id) => {
    const boardCopy = squares.map((row) => {
      row.forEach((column) => {
        if (column.id === id) {
          if (player === PLAYER_1) {
            column.value = PLAYER_1;
          } else {
            column.value = PLAYER_2;
          }
        }
      });
      return row;
    });
    setSquares(boardCopy);
    if (player === PLAYER_1) {
      setPlayer(PLAYER_2);
    } else {
      setPlayer(PLAYER_1);
    }

    checkForWinner();
  };

  const checkForWinner = () => {
    let r = 0;
    let c = 0;
    let winner = '';

    // checking for descending diaganol winner
    if (
      squares[r][c].value === squares[r + 1][c + 1].value &&
      squares[r + 1][c + 1].value === squares[r + 2][c + 2].value
    ) {
      winner = squares[r][c].value;
      setWinner(winner);
    }

    // checking for ascending diaganol winner
    if (
      squares[r][c + 2].value === squares[r + 1][c + 1].value &&
      squares[r + 1][c + 1].value === squares[r + 2][c].value
    ) {
      winner = squares[r][c + 2].value;
      setWinner(winner);
    }

    // checking for horizontal winner
    while (r < 3) {
      if (
        squares[r][c].value === squares[r][c + 1].value &&
        squares[r][c + 1].value === squares[r][c + 2].value
      ) {
        winner = squares[r][c].value;
        setWinner(winner);
      }
      r += 1;
    }
    // checking for vertical winner
    while (c < 3) {
      r = 0;
      if (
        squares[r][c].value === squares[r + 1][c].value &&
        squares[r + 1][c].value === squares[r + 2][c].value
      ) {
        winner = squares[r][c].value;
        setWinner(winner);
      }
      c += 1;
    }
  };

  const resetGame = () => {
    const boardCopy = squares.map((row) => {
      row.forEach((column) => {
        column.value = '';
      });
      return row;
    });
    setSquares(boardCopy);
    setWinner('...');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is {winner} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onSquareClickCallback} />
      </main>
    </div>
  );
};

export default App;
