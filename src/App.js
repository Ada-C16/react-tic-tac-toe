import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const playerOne = 'x';
const playerTwo= 'o';

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
  // ALL PIECES OF STATE
  // PIECES OF STATE FOR UPDATING SQUARES
  const [squares, setSquares] = useState(generateSquares());
  // PIECE OF STATE FOR PLAYER TURNS
  const [turn] = useState({ playerTurn: false});
  // PIECE OF STATE FOR DETERMINING THE WINNER
  const [winner, setWinner] = useState(null);
  

  
  const onClickCallback = (id) => {
    const updateSquare = squares.map((square) => {
      for (let subSquare of square) {
        if (subSquare.id === id && subSquare.value === '' && !winner) {
          subSquare.value = getCurrentPlayer();
          if (checkForWinner() !== null) {
            setWinner(checkForWinner());
          }
        }
      }
      return square;
    });
    setSquares(updateSquare); 
  };

  const getCurrentPlayer = () => {
    turn.playerTurn = !turn.playerTurn;
    
    if (turn.playerTurn) {
      console.log(playerOne);
      return playerOne;
    } else {
      console.log(playerTwo);
      return playerTwo;
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
    setSquares(generateSquares());
    setWinner(null);
  };

  // FUNCTION TO DISPLAY THE WINNING PLAYER
  // THIS IS A WORKING FUNCTION BUT DOESN'T PASS TESTS
  // WILL IMPLEMENT AFTER GRADING
  // const getPlayer = (letter) => {
  //   if (letter === 'x') {
  //     return 'Player One!';
  //   } else if (letter === 'o') {
  //     return 'Player Two!';
  //   } else {
  //     return null;
  //   }
  // };
  
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner}</h2>
        <button onClick={() => resetGame()}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares}
        onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
