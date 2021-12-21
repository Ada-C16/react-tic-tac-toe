import React, { useEffect, useState } from 'react';
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

  const [playerTurn, setPlayerTurn] = useState(PLAYER_1);
  const toggleTurn = () => {
    // counter = 0;
    setPlayerTurn(playerTurn === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  }
    // if value:
    //   pass


  const [squares, setSquares] = useState(generateSquares());
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const changeSquareValue = (id) => {
    let newSquares = [];
    for (let row of squares) {
      let rowArray = [];
      for (let column of row) {
        if (column.id === id && !column.value) {
          rowArray.push({id: column.id,
          value: playerTurn});
          toggleTurn();
        } else 
        {rowArray.push(column)}
      } newSquares.push(rowArray); 
    }
    setSquares(newSquares);
  }

  // useEffect(checkForWinner, [squares])

  // if (!checkForWinner()) {
  //   ...
  // }

  const checkForWinner = () => {
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if
    //    all three squares have the same value.

    // If there is no winner, display nothing
    // If there is a winner, display the winner
    // If there is a tie, y'all both lose!!!!!!!!

    // This function will return x, o, tie, or none
  
    // [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]]

    let squaresArray = [];

    for (let rowIndex in squares) {
      for (let objectIndex in squares[rowIndex]) {
        squaresArray.push(squares[rowIndex][objectIndex].value)
      }
    }

    // ROWS
    if (squaresArray[0] != '' && squaresArray[0] === squaresArray[1] && squaresArray[0] === squaresArray[2]) {
      return squaresArray[0]
    } else if (squaresArray[3] != '' && squaresArray[3] === squaresArray[4] && squaresArray[3] === squaresArray[5]) {
      return squaresArray[3]
    } else if (squaresArray[6] != '' && squaresArray[6] === squaresArray[7] && squaresArray[6] === squaresArray[8]) {
      return squaresArray[6]
    } 
    // COLUMNS 
    else if (squaresArray[0] != '' && squaresArray[0] === squaresArray[3] && squaresArray[0] === squaresArray[6]) {
      return squaresArray[0]
    } else if (squaresArray[1] != '' && squaresArray[1] === squaresArray[4] && squaresArray[1] === squaresArray[7]) {
      return squaresArray[1]
    } else if (squaresArray[2] != '' && squaresArray[2] === squaresArray[5] && squaresArray[2] === squaresArray[8]) {
      return squaresArray[2]
    }
    // DIAGONALS
    else if (squaresArray[0] != '' && squaresArray[0] === squaresArray[4] && squaresArray[0] === squaresArray[8]) {
      return squaresArray[0]
    } else if (squaresArray[6] != '' && squaresArray[6] === squaresArray[4] && squaresArray[6] === squaresArray[2]) {
      return squaresArray[6]
    }

    if (squaresArray.includes('')) {
      return null
    } else {
      return "Tie"
    }
  };

  const declareWinner = () => {
    if (!checkForWinner()) {
      return <h2>It&apos;s Player {playerTurn}&apos;s turn!</h2>
    } else if (checkForWinner() == 'Tie') {
      return <h2>Y&apos;all both lose! &#128532;</h2>
    } else {
      return <h2>&#127881; Player {checkForWinner()} wins the game! &#127881;</h2>
    }
  }

  const resetGame = () => {
    setSquares(generateSquares());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {declareWinner()}
        <button onClick={() => resetGame()}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={changeSquareValue}/>
      </main>
    </div>
  );
};

export default App;
