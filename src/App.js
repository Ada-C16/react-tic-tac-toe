// import { PROPERTY_TYPES } from '@babel/types';
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
  // This starts state off as a 2D array of JS objects with empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());

  const [message, setMessage] = useState('Current player is: x');
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [squareClicked, setSquareClicked] = useState([]);

  const squaresCopy = [...squares];

  const onClickCallback = (key) => {
    if (!isGameRunning){
      return;
    }

    for (let i=0; i<squareClicked.length; i++){
      if (key === squareClicked[i]){
        return;
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

        if (squaresCopy[i][j].id == key) {
          setSquareClicked(squareClicked.concat(key));
          squaresCopy[i][j].value = currentPlayer;

          if (currentPlayer === PLAYER_1) {
            setCurrentPlayer(PLAYER_2);
            setMessage(`Current player is: ${PLAYER_2}`);
          } else if (currentPlayer === PLAYER_2) {
            setCurrentPlayer(PLAYER_1);
            setMessage(`Current player is: ${PLAYER_1}`);
          }
        }
      }
    }
    setSquares(squaresCopy);

    const winner = checkForWinner();
    if (winner === 'x' || winner === 'o') {
      setMessage(`Winner is ${winner}`);
      setIsGameRunning(false);
      return;
    }
    if (squareClicked.length === 8){
      setMessage('The game ended with no winner. Click the reset button to play again');
      setIsGameRunning(false);
    }
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
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squaresCopy[i][j].value = ''; 
      }
    }
    setSquares(squaresCopy);
    setCurrentPlayer(PLAYER_1);
    setMessage(`Current player is: ${PLAYER_1}`);
    setSquareClicked([]);
    setIsGameRunning(true);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>{message}</h2>
        <button className="resetButton" onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board onClickCallback={onClickCallback} squares={squares} />
      </main>
    </div>
  );
};

export default App;
