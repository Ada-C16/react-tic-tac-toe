import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

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
  const [winner, pickWinner] = useState(null);
  const [currentPlayer, setPlayer] = useState(PLAYER_1);

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

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

  const onClickCallback = (id) => {
    setSquares((squares) => {
      let newBoard = squares.map((square)=> {
        for (let property of square){
          if (property.id === id){
            if (currentPlayer === PLAYER_1) {
              property.value = PLAYER_1
            }else if (currentPlayer === PLAYER_2){
              property.value = PLAYER_2
            }
        }
      } return square;

    }); pickWinner(checkForWinner())
    return newBoard;
  });
    if (currentPlayer === PLAYER_1){
      setPlayer(PLAYER_2)
    }else {
      setPlayer(PLAYER_1)
    }
  };

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    pickWinner(null);
    setPlayer(PLAYER_1);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ...{winner} </h2>
        <button onClick = {resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/>
      </main>
    </div>
  );
};

export default App;
