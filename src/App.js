import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const playerOne = 'X';
const playerTwo = 'O';

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
  const [player, setPlayer] = useState(playerOne);
  const [winner, setWinner] = useState(null);

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const idToBoardPosition = {
      0: [0,0],
      1: [0,1],
      2: [0,2],
      3: [1,0],
      4: [1,1],
      5: [1,2],
      6: [2,0],
      7: [2,1],
      8: [2,2]
  };
  const changeIdToBoardPosition = (id) => {
        let boardPosition = idToBoardPosition[id];
        return boardPosition;
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

  const resetGame = () => {
    // Complete in Wave 4
  };

const onClickCallback = (id) => {
    if (winner) {
        return;
    }
    const boardPosition = changeIdToBoardPosition(id);
    const squaresDuplicate = [...squares];

    squaresDuplicate[boardPosition[0]][boardPosition[1]].value = player;
    setSquares(squaresDuplicate);

    if (player === playerOne) {
        setPlayer(playerTwo);
    } else {
        setPlayer(playerOne);
    }
    
    setWinner(checkForWinner());
 };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is {winner}</h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board onClickCallback={onClickCallback} squares={squares} />
      </main>
    </div>
  );
};

export default App;
