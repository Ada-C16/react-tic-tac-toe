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
      console.log(squares, 'squ');
      currentId += 1;
      
    }
  }
  console.log(squares);
  return squares;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares()); //blank board
  const [currentplayer,setplayer] = useState(Player1);
  
  



  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const onClickCallback = (id) => {
    const newSquares = [...squares];
    for (let row of newSquares) {
      for (let column of row) {
        console.log(row, 'data');
        if (column.id === id && column.value === '' && !checkForWinner()) {
          column.value = currentplayer;
        }
      }
    }
    setSquares(newSquares);
    if (currentplayer === Player1) {
      setplayer(Player2);
    } else setplayer(Player1);
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
  // checkForWinner();
  // console.log(checkForWinner());

  //Wave 4 
  const resetGame = () => {
    setSquares(generateSquares());
    setplayer(Player1);
  };
  
  const displaytheWinner = () => {
        if (checkForWinner() === Player1){

          return `Winner is ${Player1}`; 
        } else if (checkForWinner() === null){

          return `'' ${currentplayer}`; 

        } else {
          return `Winner is ${Player2}`;
        }
      
    };
    // setSquares(generateSquares());

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>{displaytheWinner()} </h2>
        <button onClick= {resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
