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

  return squares;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState('');
  const [isTie, setIsTie] = useState(false);

  const markSquare = (clickedSquare) => {
    if (clickedSquare.value === '' && winner === '') {
      const updatedSquares = squares.map((row) => {
        row.map((square) => {
          if (square.id === clickedSquare.id) {
            square.value = currentPlayer;
          }
          return square;
        });
        return row;
      });
      setSquares(updatedSquares);
    }
  };

  const switchPlayers = () => {
    currentPlayer === PLAYER_1
      ? setCurrentPlayer(PLAYER_2)
      : setCurrentPlayer(PLAYER_1);
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

  const checkForTie = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (squares[i][j].value === '') {
          return false;
        }
      }
    }
    return true;
  };

  const boardMessage = () => {
    if (winner) {
      return `Winner is ${winner}`;
    } else if (isTie) {
      return 'Tie';
    } else {
      return `Current Player ${currentPlayer}`;
    }
  };

  const updateBoard = (square) => {
    markSquare(square);

    const winner = checkForWinner();
    if (winner) {
      setWinner(winner);
    } else {
      setIsTie(checkForTie());
      switchPlayers();
    }
  };

  const resetGame = () => {
    setSquares(generateSquares());
    setCurrentPlayer(PLAYER_1);
    setWinner('');
    setIsTie(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{boardMessage()}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board onClickCallback={updateBoard} squares={squares} />
      </main>
    </div>
  );
};

export default App;
