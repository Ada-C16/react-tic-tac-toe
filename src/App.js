import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';
const PLAYERS = [PLAYER_1, PLAYER_2];
const WINNING_THRESHOLD = 3;

const ROWS = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]]
];
const COLUMNS = [
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]]
];
const DIAGONALS = [
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
];
const BOARDSIZE = 9;

const DIRECTIONS = [ROWS, COLUMNS, DIAGONALS];

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

  const [currentPlayer, setCurrentPlayer] = useState(0);

  const updateCurrentPlayer = () => {
    const playerNums = PLAYERS.length;
    nextPlayer = (currentPlayer + 1) % playerNums;
    setCurrentPlayer(nextPlayer)
  };

  const checkOneDirection = (direction, squares) => {
    direction.forEach(
      squareSet => {
        xCount = 0;
        oCount = 0;
        squareSet.forEach(
          position => {
            let i = position[0];
            let j = position[1];
            let square = squares[i][j];
            if (square.value === PLAYER_1) {
              xCount++;
            } else if (square.value === PLAYER_2) {
              oCount++;
            }
          }
        )
        if (xCount === WINNING_THRESHOLD) {
          return PLAYER_1;
        } else if (oCount === WINNING_THRESHOLD) {
          return PLAYER_2;
        }
      }
    )
    return null;
  };
  
  const countMoves = (squares) => {
    let movesCount = 0;
    squares.forEach(square => {
      if (square.value === PLAYER_1 || square.value === PLAYER_2) {
        movesCount++;
      }
    })
    return movesCount;
  }

  const checkForWinner = () => {
    DIRECTIONS.forEach(
      direction => {
        let winner = checkOneDirection(direction, squares)
        if (winner === PLAYER_1) {
          return PLAYER_1;
        } else if (winner === PLAYER_2) {
          return PLAYER_2;
        }
      }
    );

    const movesCount = countMoves(squares);
    if (movesCount < BOARDSIZE) {
      return null;
    }
    return 'TIE';
  };

  const resetGame = (event) => {
    event.preventDefault();
    setSquares(generateSquares());
    setCurrentPlayer(1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* only visible if gameState != 0 */}
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} />
      </main>
    </div>
  );
};

export default App;
