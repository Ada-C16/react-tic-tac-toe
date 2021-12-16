//QQ Mariah - what's the plan for this prettier check? LMK on slack.
import { check } from 'prettier';
import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  console.log('in generateSquares');
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '_',
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

  //Setting up the player so we can update the player after a turn and add the right value
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  // made this - Lety
  const clickSquare = (mySquare) =>{
    console.log('in clickSquare');
    console.log('currentPlayer is:' + currentPlayer);
    //I AM NOT GETTING THE SQUARE's ID or value by using mySquare.props.id, mySquare.id, this.props.id, etc.
    //NEED TO FIND OUT WHY THE SQUARE appears bound, but cannot get the prop
    console.log('the square\'s ID is:' + mySquare.props.id);
    
    //pseudo-code below to update it
    //Find index of specific object using findIndex method.    
    //objIndex = squares.findIndex((obj => obj.id == 1));
    //squares[objIndex].value = currentPlayer;

    //update the specific id of the square in the array to have a value of state's currentPlayer, then use setSquares to update the state
    // 1.find the id of the object in the array and update the value
    // 2.call setSquares
      // setSquares();

    //Now that we put the mark on the square, check and see if they won by calling checkForWinner()
    let isWon = checkForWinner();
    if (!isWon){
      //Now that we put the mark on the square and there is no winner, let's move to the next player
      console.log('currentPlayer is:' + currentPlayer);
      if (currentPlayer == PLAYER_1){
        setCurrentPlayer(PLAYER_2);
      }else{
        setCurrentPlayer(PLAYER_1);
      }
    }else{
      //alert that the game is getting reset and call the reset
      resetGame();
    }


  };

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
    // Complete in Wave 4
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button>Reset Game</button>
      </header>
      <main>
        {/* passing the onClickCallback here; created the  clickSquare function to test it out */}
        <Board squares={squares} onClickCallback={clickSquare} />
      </main>
    </div>
  );
};

export default App;
