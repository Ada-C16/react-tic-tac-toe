import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';
const PLAYERS = [PLAYER_1, PLAYER_2];

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
  }

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  // const onClickCallBack = () => {
    //check if event is a valid move, aka on a blank square
    //if event is a valid move
    //set square value to PLAYERS[currentPlayer]
    //check for Winner
  // };

  
  const checkForWinner = () => {
    // Complete in Wave 3
    
    // You will need to:
    // 1. Go accross each row to see if
    //    3 squares in the same row match
    //    i.e. same value

    
    // 2. Go down each column to see if
    //    3 squares in each column match

    // 3. Go across each diagonal to see if
    //    all three squares have the same value.

    //4. check if there's no more blank square
  };

  const resetGame = (event) => {
    event.preventDefault();
    setSquares(generateSquares());
    setCurrentPlayer(1);
    setGameState(0);
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
