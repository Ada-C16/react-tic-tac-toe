import React, { useEffect, useState } from 'react';
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
  const [turn, setTurn] = useState('x');
  const [turnInfo, setTurnInfo] = useState(`current player: ${turn}`);

  const toggleTurn = () => {
    
    if (turn === 'x'){
      setTurn('o');
    } else {
      setTurn('x');
    }
    ///*.then(
    //setTurnInfo(`current player: ${turn}`);
    //)*/
    
  };
  /*
  const [isX, setIsX] = useState(true);

  const toggleX = () => {
    setIsX(!isX);
  };

  const turn = isX ? 'x' : 'o';
  */
  useEffect(() =>
  setTurnInfo(`current player ${turn}`), [turn]);

  const onClickCallback = (id) => {
    const newSquares = squares.map( (row) => {
      row.map((square) => {
        if (square.id === id && square.used !== true) {
          const newValue = {value: turn,
                            used: true};
          let newSquare = Object.assign(square, newValue);
         return newSquare;
        }
        return square;
      });
      return row;
    });
    setSquares(newSquares);
    toggleTurn();
    if (checkForWinner()) {
      const newSquares = squares.map( (row) => {
        row.map((square) => {
          const newValue = {used: true};
          let newSquare = Object.assign(square, newValue);
          return newSquare;

        });
        return row;
      });
      setSquares(newSquares);
      //toggleTurn();
      setTurnInfo(`Winner is ${checkForWinner()}`);
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
    // Complete in Wave 4
  };

  

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>{turnInfo}</h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/>
      </main>
    </div>
  );
};

export default App;
