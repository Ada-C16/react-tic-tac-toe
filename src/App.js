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
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(PLAYER_1);
  const [over, setOver] = useState(false);

  const endGame = () => {
    if (!over) {
      setOver(true)
    }
  }

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const updateSquares = target => {
    if (!over) {
      const newSquares = squares.map(row =>
        row.map((square) => {
          if (square.id === target && square.value === "") {
            const currentPlayer = player;
            if (player === PLAYER_1) {
              setPlayer(PLAYER_2);
            } else {
              setPlayer(PLAYER_1);
            }

            return { id: square.id, value: currentPlayer };
          } else {
            return square;
          }
        })
      )

      setSquares(newSquares)
    }
  }

  const winner = () => {
    // Don't check if already won!
    
    // Diagonal
    if (
      (squares[0][0].value === squares[1][1].value &&
       squares[1][1].value === squares[2][2].value) ||
      (squares[2][0].value === squares[1][1].value &&
       squares[1][1].value === squares[0][2].value)
    ) {
      if (squares[1][1].value !== "") {
        endGame();
        return squares[1][1].value;
      }
    }

    for (let i = 0; i < 3; i++) {
      // Row
      if (squares[i][0].value === squares[i][1].value &&
          squares[i][1].value === squares[i][2].value) {
        if (squares[i][0].value !== "") {
          endGame();
          return squares[i][0].value;
        }
      }

      // Column
      if (squares[0][i].value === squares[1][i].value &&
        squares[1][i].value === squares[2][i].value) {
          
        if (squares[0][i].value !== "") {
          endGame();
          return squares[0][i].value;
        }
      }
    }

    for (let row of squares) {
      for (let square of row) {
        if (square.value === "") {
          return null;
        }
      }
    }

    endGame();
    return "tie";
  };

  const resetGame = () => {
    setSquares(generateSquares());
    setPlayer(PLAYER_1);
    setOver(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is {winner()}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquares} />
      </main>
    </div>
  );
};

export default App;
