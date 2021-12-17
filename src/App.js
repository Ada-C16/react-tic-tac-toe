import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const playerOne = 'x';
const playerTwo = 'o';

// create a current_player_value using state and keeps track of alternating players <= 9 times.

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
  const [player, setPlayer] = useState(playerOne);
  const [winner, setWinner] = useState(null);
  // const [reset, setRest] = useState()
 

  const onClickCallback = (id) => {
    console.log('Squares', squares);
    const updatedSquares = squares.map((square) => {
      for (const nestedSquare of square){
        if (nestedSquare.id === id){
          if (nestedSquare.value === ''){
            nestedSquare.value = player;
          }
        }
      }
      return square;
    });
    if (player === playerOne){
      setPlayer(playerTwo);
    } else {
      setPlayer(playerOne);
    }
    
    setSquares(updatedSquares);
    checkForWinner();
    console.log(checkForWinner());
    setWinner(checkForWinner());
  };

 
  //  create conditional that will alternate between if player is x or O

  

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

  const resetGame = () => {
    setSquares(generateSquares());
    setPlayer(playerOne);
    setWinner(null);


  };

    return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
