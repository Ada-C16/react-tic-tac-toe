import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const player1 = 'x';
const player2 = 'o';
// let winner = null;

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
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [winner, setWinner] = useState(null);

  

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
    //trying to reset the header here, too:
    // headerVar = <h2>Current player is {currentPlayer}</h2>;
    setWinner(null);
    setSquares(generateSquares);
  };


  const onClickCallback = (id) => {
    setSquares((squares) => {
      let newBoard = (squares.map((square) => {
        for (const indivSquare of square) {
          if ((indivSquare.id === id) && (indivSquare.value === '')) {
            if (currentPlayer === player1) {
              indivSquare.value = 'x';
            } else if (currentPlayer === player2) {
              indivSquare.value = 'o';
            }
            if (currentPlayer === player1) {
              setCurrentPlayer((player2));
            } else {
              setCurrentPlayer((player1));
            }
          }
        }
        
      return square;
    }
    ));

      setWinner(checkForWinner());
      return newBoard;
    }
    );
  };
    //if every square.value is x or o, and
    //if winner is null,
    //winner is tie

    // for (const squareRow of squares) {
    //   for (const oneSquare of squareRow) {
        
    //   }
    // }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        {winner? <h2>Winner is {winner}</h2> : <h2>Current player is {currentPlayer}</h2>}
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}></Board>
      </main>
    </div>
  );
};

export default App;

//we can create variables like header variables that can hold jsx!
//so then we can assign/reassign the variable and change what is displayed!


//how to make squares unclickable when they are filled?


