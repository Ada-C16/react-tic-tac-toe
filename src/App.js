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
  const [squares, setSquares] = useState(generateSquares());

  // create state var for players
  const [currentPlayer, setNextPlayer] = useState(PLAYER_1);

  // const flatArray = [];
  // for (let appArray of squares) {
  //   for (let innerArray of appArray) {
  //     flatArray.push(innerArray);
  //   }
  // }

  // keeps track of the winner, who clicks what, etc.
  const onClickCallback = (id) => {
    // copy the squares array to newBoard
    const newBoard = [...squares];

    newBoard.map((squareArray) => {
      // looping through the square array, get each square object..
      return squareArray.map((square) => {
        if (square.id === id && square.value === '') {
          // check if current player is X or O
          if (currentPlayer === PLAYER_1) {
            square.value = PLAYER_1;
            setNextPlayer(PLAYER_2);
          } else {
            square.value = PLAYER_2;
            setNextPlayer(PLAYER_1);
          }
        }
      });
    });
  };

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
  };

  const resetGame = () => {
    // Complete in Wave 4
    const newBoard = generateSquares();
    setSquares(newBoard);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
