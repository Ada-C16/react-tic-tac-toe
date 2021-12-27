import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const player1 = 'X';
const player2 = 'O';

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

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  // How to get playerTurn to reach Square where the square state gets updated?
  const [playerTurn, setPlayerTurn] = useState(player1);
  const [playerTurns, setPlayerTurns] = useState(0);
  const [winnerState, setWinnerState] = useState(null);

  const onClickCallback = (markedSquare) => {    

    const makeNewBoard = (squares) => {
      const newBoard = [...squares];
      for (let row of squares) {
        for (let square of row) {
          if ((square.id === markedSquare.id) && (square.value === '')) {
            square.value = markedSquare.value;
            setPlayerTurn(() => {
              return ((playerTurn === player1) ? player2 : player1);
            });
            setPlayerTurns((prevState) => {
              return (prevState += 1);
            });
            console.log('playerTurns',playerTurns);
          }
        }
      }
      return newBoard;
    };

    setSquares(makeNewBoard(squares));
    const winner = checkForWinner();
    if (winner) {
      setWinnerState(winner);
    } 
  };

  const checkForWinner = () => {
    let i = 0;
    console.log('squares', squares);
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
    setSquares(generateSquares());
    setPlayerTurn(player1);
    setPlayerTurns(0);
    setWinnerState(null);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winnerState}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board winnerState={winnerState} playerTurn={playerTurn} onClickCallback={onClickCallback} squares={squares} />
      </main>
    </div>
  );
};

export default App;
