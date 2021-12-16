import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const player1 = 'X';
//change to PLAYER_1  etc bc global const
const player2 = 'O';
let winner = null;
// let currentPlayer = player1;


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

  // const resetGame = () => {
  //   // Complete in Wave 4
  // };
  const onClickCallback = (id) => {
    console.log('hi', squares);
    setSquares((squares) => {
      // let newBoard = [];
      let newBoard = (squares.map((square) => {
        for (const indivSquare of square) {
          if (indivSquare.id === id) {
            if (currentPlayer === player1) {
              indivSquare.value = 'X';
              
            } else if (currentPlayer === player2) {
              indivSquare.value = 'O';
              
            }
          }
        }
        
        
        
        

      return square; //why do we need to return? bc of .map
      //.map expects me to return it values that it then adds to a new array
    }
 
    ));
    
    
    


    // if (winner === null) {
      return newBoard;
    // } //else deactivate squares and update header
    }
    
    
    
    );
  
    
    
    winner = checkForWinner();
    if (currentPlayer === player1) {
      setCurrentPlayer((player2));
    } else {
      setCurrentPlayer((player1));
    }
  };

  
  

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is {winner}</h2>
        <h3>Current player is {currentPlayer}</h3>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}> hi </Board>
      </main>
    </div>
  );
};

export default App;


//the method we need to create in app
//will update the GAME BOARD
//the onClickCallBack function will update the value property of the square object