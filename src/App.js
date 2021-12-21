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
  const [playerTurn, setPlayerTurn] = useState(PLAYER_1);
  
  const toggleTurn = () => {
    setPlayerTurn(playerTurn === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  }

  const [squares, setSquares] = useState(generateSquares());

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

  const checkForWinner = () => {
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
