import { check } from 'prettier';
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

  // console.log(squares);
  // squares[1][1].value = PLAYER_1;

  return squares;
};

const App = () => {
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  console.log(squares);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  // console.log(squares);

  // this is the function for the onClickCallback button-so when the user click the square, it calls updateSquareData
  const updateSquareData = (updatedSquare) => {
    console.log(squares);
    // spread is copying the who array of squares
    const newSquares = [...squares];
    for (let row = 0; row < squares.length; row++) {
      for (let col = 0; col < squares.length; col++) {
        if (checkForWinner() === null) {
          if (newSquares[row][col].id === updatedSquare.id) {
            if (newSquares[row][col].value === '') {
              newSquares[row][col].value = currentPlayer;
              setCurrentPlayer(
                currentPlayer === PLAYER_2 ? PLAYER_1 : PLAYER_2
              );
            }
          }
        }
      }
    }
    setSquares(newSquares);
    // if current player is player2 then it switch to player1

    checkForWinner();
  };

  const checkForWinner = () => {
    // console.log(checkForWinner);
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

  // const resetGame = () => {
  //   // Complete in Wave 4
  // };

  const resetGame = () => {
    //use setSquares to reset the squares
    // useState is for initialzing the state
    // update data to blank
    setSquares(generateSquares());
    setCurrentPlayer(PLAYER_1);

    // Complete in Wave 4
  };

  // const displayWinner = () => {
  //   return `Current Player ${checkForWinner()}`;
  // };

  // set a different message if there is no winner
  const displayMessage = () => {
    let winner = checkForWinner();
    console.log(winner);
    let message = '';
    if (winner !== null) {
      message = `Winner is ${winner}`;
    } else {
      message = `Current Player ${currentPlayer}`;
    }
    return message;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* <h2>{displayWinner()} </h2> */}
        <h2>{displayMessage()}</h2>
        {/* give the function to call the resetGame for the anyomous */}
        {/* onClick={() => {resetGame()}} */}
        {/* telling React to call the function vs to tell React to call my Anyomnous fuct. */}
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquareData} />
      </main>
    </div>
  );
};

export default App;
