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
  const [winner, setWinner] = useState(null);

  // let currentPlayer = PLAYER_1;
  // let winner = null;

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

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
    let resetBoard = generateSquares();
    setCurrentPlayer(PLAYER_1);
    setWinner(null);
    setSquares(resetBoard);
  };

  const onClickCallback = (id) => {
    console.log('onclick', id);
    setSquares((squares) => {
      let newBoard = squares.map((square) => {
        for (let property of square) {
          if (property.id === id && property.value === '') {
            if (currentPlayer === PLAYER_1) {
              property.value = PLAYER_1;
            } else if (currentPlayer === PLAYER_2) {
              property.value = PLAYER_2;
            }
          }
        }

        return square;
      });

      setWinner(checkForWinner());
      return newBoard;
    });

    if (currentPlayer === PLAYER_1) {
      setCurrentPlayer(PLAYER_2);
    } else {
      setCurrentPlayer(PLAYER_1);
    }
  };

  let header;
  let boardCallback;
  // logic to display 'Player 1' instead of x, disabled for tests
  // let finalWinner;
  if (winner != null) {
    // if (winner === PLAYER_1) {
    //   finalWinner = 'Player 1';
    // } else {
    //   finalWinner = 'Player 2';
    // }
    header = <h2>Winner is {winner}</h2>;
  } else {
    header = <h2>The Current Player is {currentPlayer}</h2>;
    boardCallback = onClickCallback;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {header}
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board onClickCallback={boardCallback} squares={squares} />
      </main>
    </div>
  );
};

export default App;
