import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  // squares is list of 3 lists, each inner list has 3 items, 3x3 matrix
  const squares = [];

  let currentId = 1;
  // for loop populates the list of squares with ids and values
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
  // squares is the variable that holds state and returns the current state whenever it's called
  // must reassign all squares to change one, call setSquares to reassign
  // useState starts with [], where 1st item is variable to be changed and the 2nd item is the
  // function to change it. useState is actually creating the variable and the function
  // useState sets the initial state to whatever is within()
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setPlayer] = useState('x');
  const [isWinner, setWinner] = useState(null);
  const onClickCallback = (id) => {
    console.log(id);
    // cannot change squares so setting newSquares as an object which can be changed
    const newSquares = [...squares];
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        if (newSquares[row][col].id === id) {
          newSquares[row][col].value = currentPlayer;
          if (currentPlayer === PLAYER_1) {
            setPlayer(PLAYER_2);
          } else if (currentPlayer === PLAYER_2) {
            setPlayer(PLAYER_1);
          }
        }
      }
    }
    // this allows newSquares to overwrite setSquares
    setSquares(newSquares);
    setWinner(checkForWinner);
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
    // using the 3 useStates to overwrite the existing conditions to revert the board to og state
    setSquares(generateSquares);
    setPlayer('x');
    setWinner(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>
          {/* this is a ternary operation, ? is "if" and : is "else" */}
          {isWinner === null
            ? `Current Player ${currentPlayer}`
            : `Winner is ${isWinner}`}{' '}
        </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        {/* assigning the props values to send to Board */}
        <Board onClickCallback={onClickCallback} squares={squares} />
      </main>
    </div>
  );
};

export default App;
