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



  const updateSquareData = (squareID) => {
    console.log(squares);
    const newSquares = [...squares];
    for (let row = 0; row <squares.length; row++) {
      for (let col = 0; col <squares.length; col++) {
        if (checkForWinner() === null) {
          if (newSquares[row][col].id === squareID) {
            if (newSquares[row][col].value === '') {
              newSquares[row][col].value - currentPlayer;
              setCurrentPlayer(
                currentPlayer === PLAYER_2 ? PLAYER_1 : PLAYER_2
              );
            }
          }
        }

      }
    }

  };
  
  setSquares();

  checkForWinner();

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
    setSquares(generateSquares());
    setCurrentPlayer(PLAYER_1);
  };

  const showMessage = () => {
    let winner = checkForWinner();
    console.log(winner);
    let message = '';
    if (winner !== null) {
      message = `winner is ${winner}`;
    }
    else{
      message = `Current player is ${currentPlayer}`;
    }

    return message;
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>{showMessage()}</h2>
        <button onClick = {() => resetGame()}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquareData}/>
      </main>
    </div>
  );
};

export default App;
