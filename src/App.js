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
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback


  //step 7: catch the id sent in from the square component
  //step 8: start using state and update the square info into a new squares object
  //step 9: start a map to loop and update the info for the specific square that changes
  //step 10: the squares update according to current player which is also a state variable defined up top
  const onClickCallback = (id) => {
    setSquares((squares)=>{
      let newSquares = squares.map((square) => {
        for(let info of square){
          if(info.id === id && info.value === ''){
            if(currentPlayer === PLAYER_1){
              info.value = PLAYER_1;
            }
            else if(currentPlayer === PLAYER_2){
              info.value = PLAYER_2;
            }
          }
        }
        return square;
      });
      //check for the winner here
      setWinner((checkForWinner()));
      //return newsquares to tell React to display the new squares
      return newSquares;
    });
    //change to other player
    if(currentPlayer === PLAYER_1){
      setCurrentPlayer(PLAYER_2);
    }else{
      setCurrentPlayer(PLAYER_1)
    }
  };

    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if
    //    all three squares have the same value.

  const checkForWinner = () => {
    let i = 0;
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
    return null; //no winner 
  };
// };

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setWinner(null);
    setCurrentPlayer(PLAYER_1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is {winner} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
