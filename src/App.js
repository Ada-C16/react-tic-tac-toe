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

// [
//   [ { id: 0, value: '' }, { id: 1, value: '' }, { id: 2, value: '' } ],
//   [ { id: 3, value: '' }, { id: 4, value: '' }, { id: 5, value: '' } ],
//   [ { id: 6, value: '' }, { id: 7, value: '' }, { id: 8, value: '' } ]
// ]

const App = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winnerHeading, setWinnerHeading] = useState('no one yet');

  const changeCurrentPlayer = () => {
    if (currentPlayer === PLAYER_1) {
      setCurrentPlayer(PLAYER_2);
    } else {
      setCurrentPlayer(PLAYER_1);
    }
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

  const updateBoard = (id) => {
    const updatedSquares = [...squares];

    for (const [idx1, nestedArr] of squares.entries()) {
      for (const [idx2, currentSquare] of nestedArr.entries()) {
        if (
          currentSquare.id === id &&
          currentSquare.value === '' &&
          checkForWinner() === null
        ) {
          updatedSquares[idx1][idx2].value = currentPlayer;
        }
      }
    }

    // update the board
    setSquares(updatedSquares);

    // either declare winner or change the current player
    if (checkForWinner() !== null) {
      setWinnerHeading(currentPlayer);
    } else {
      changeCurrentPlayer();
    }
  };

  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is: {winnerHeading}!</h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateBoard} />
      </main>
    </div>
  );
};

export default App;
