import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const Player1 = 'x';
const Player2 = 'o';

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
  // const [winner, setWinner] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(Player1);
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const onClickSquare = (id) => {
    console.log(id);
    const newSquares = [...squares];
    if (checkForWinner() === null) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (id === newSquares[i][j].id && newSquares[i][j].value === '') {
            newSquares[i][j].value = currentPlayer;
          }
        }
      }
    }
    // setWinner(checkForWinner());
    setSquares(newSquares);
    // console.log(winner);

    if (currentPlayer === Player1) {
      setCurrentPlayer(Player2);
    } else {
      setCurrentPlayer(Player1);
    }
    checkForWinner();
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
    // Complete in Wave 4
    setSquares(generateSquares);
  };

  // **NEXT STEP** consider writing a helper function that will change the header to reflect the winner of the game
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* I will render the helper function from like 106 here  */}
        <h2>Winner is {checkForWinner()}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickSquare} />
      </main>
    </div>
  );
};

export default App;
