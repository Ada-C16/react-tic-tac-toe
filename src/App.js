import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';
let TURN = true;

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
  const [turn, setTurn] = useState(TURN);
  
  const updateSquares = (id) => {
    console.log('Hey we are in update squares');
    let newSquares = [];
    // let newRow = [];
    let strVal = '';
    strVal = turn==true? 'X':'O';
    for (let row of squares){
      let newRow = row.map((square)=>{
        if (square.id==id) {
          square.value = strVal;
          return square;
          } 
        return square;
        })
        
      // for (let square of row) {
      //   if (square.id==id) {
      //       square.value = strVal;
      //       newRow.push(square);
      //       console.log(`Square ${id} was clicked`);
      //   }
      //   else {
      //     newRow.push(square);
      //   }
      // }

      // newSquares.push(newRow);
    // };
    newSquares.push(newRow);
  }
    let newTurn = !turn;
    setTurn(newTurn);
    setSquares(newSquares);
  };
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

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
  };

  const resetGame = () => {
    setSquares(generateSquares());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button onClick={()=>{resetGame();}}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquares}/>
      </main>
    </div>
  );
};

export default App;
