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

  //update current player
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  // sets the game winner
  const [gameWinner, setGameWinner] = useState('');

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
    setSquares(generateSquares());
  };

  const onClickCallback = (id) => {
    console.log('click', id);
    const newSquares = [...squares];

    // returns early if a winner has been choosen
    if (checkForWinner()) {
      return;
    }

    for (let i = 0; i < newSquares.length; i++) {
      for (let j = 0; j < newSquares[i].length; j++) {
        if (newSquares[i][j].id === id && newSquares[i][j].value === '') {
          newSquares[i][j].value = currentPlayer;
          // if square has been clicked this
          // prevents it from being clicked again
        } else if (newSquares[i][j].id === id) {
          return;
        }
      }
    }
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    setGameWinner(checkForWinner());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2 id="win">Winner is... {gameWinner}</h2>
        <h3> Current player: {currentPlayer}</h3>
        <button onClick={resetGame}>Play again!</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
