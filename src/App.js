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
  const [currentPlayer, setCurrentPlayer] = useState(PlAYER_1);
    // Wave 2
    //  will need to create a method to change the square
    //   When it is clicked on.
    //   Then pass it into the squares as a callback
  const squareClick = (id) => {
    let madeMove = false;
    const updateState = squares.map(row => row.map(pos => {
      if (pos.id !== id) {return pos;}
      madeMove =true;
      return {...pos, value: currentPlayer};
    }));
    if (madeMove){
    setSquares(newState);
    let newPlayer;
    if (currentPlayer == PLAYER_1) {
      newPlayer = PlAYER_2;
    }
    setCurrentPlayer();
    }  
  };

    // to map every id to the row and column on the array
    // the row for any number is going to be this formula
    // and the column is also this formula
    const row = parseInt(id / 3);
    const col = id - 3 * parseInt(id / 3);

    
    // will pass whoevers turn it is here

    squares[row][col] = 'x';

    // change the state
    setSquares(squares);
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
    // need to update this for ties
    return null;
  };

  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={squareClick} />
      </main>
    </div>
  );
};

export default App;
