import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';
let changedSquares;

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

// Creating 2D array
const reshapSquare = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};

const App = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [nextPlayer, setNextPlayer] = useState(true);
  const [gameWinner, setWinner] = useState(null);

  const currentPlayer = nextPlayer ? PLAYER_1 : PLAYER_2;

  const changeSquare = (id) => {
    if (gameWinner !== null) {
      return;
    }

    let flattenArray = squares.flat();
    changedSquares = flattenArray.map((square) => {
      if (square.id === id && square.value === '') {
        square.value = currentPlayer;
        console.log(currentPlayer, 'currentPlayer');
      }

      return square;
    });

    setNextPlayer(!nextPlayer);
    setSquares(reshapSquare(changedSquares));
    setWinner(checkForWinner);
  };

  const checkForWinner = () => {
    let i = 0;
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

    return null;
  };

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setNextPlayer(PLAYER_1);
    // setSquares(reshapSquare(changedSquares));
    setWinner(null);
    console.log('reset');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is {gameWinner} </h2>
        <h3> Current Player is {currentPlayer}</h3>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={changeSquare} />
      </main>
    </div>
  );
};
export default App;
