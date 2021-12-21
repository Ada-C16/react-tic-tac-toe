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

  //Set the label for the winner
  const [winnerLabel, setWinnerLabel] = useState('')

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  // made this - Lety
  const clickSquare = (mySquare) =>{
    console.log('in clickSquare');
    console.log('currentPlayer is:' + currentPlayer);
    console.log('the square\'s ID is:' + mySquare);
    
    //pseudo-code below to update it  
    for (let i=0; i<3; i++){
      for (let n=0; n<3; n++){
        //console.log(squares[i][n].id);
        if (squares[i][n].id == mySquare){
          squares[i][n].value = currentPlayer;
        }
      }
    }
    //  updating state here with a copy of the squares list with new value
    setSquares([...squares]);
    

    //Now that we put the mark on the square, check and see if they won by calling checkForWinner()
    let isWon = checkForWinnerChickenDinner();
    if (!isWon){
      //Now that we put the mark on the square and there is no winner, let's move to the next player
      console.log('currentPlayer is:' + currentPlayer);
      if (currentPlayer == PLAYER_1){
        setCurrentPlayer(PLAYER_2);
      }else{
        setCurrentPlayer(PLAYER_1);
      }
    }else{
      setWinnerLabel('The winner is ' + currentPlayer.toLowerCase() );
      //now call reset function

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

    // checking for winner in rows and setting return value to current player
    // the current player is being populated in <h2> below 
    for (let i=0; i<3; i++){
      if (squares[i][0].value == PLAYER_1 & squares[i][1].value == PLAYER_1 & 
        squares[i][2].value == PLAYER_1) {
        return currentPlayer;
      } else if (squares[i][0].value == PLAYER_2 & squares[i][1].value == PLAYER_2 & 
      squares[i][2].value == PLAYER_2){
        return currentPlayer;
      }
    }
    return '';
};

// const makeWinningCombos = (n) =>{
  // // This creates the array based on position, not the IDs like we want
  // // Giving up because we can just keep it simple for now.
//   // #this will create an array of arrays of winning combos
//   let winningArray = []

//   // #make the row winners
//   for (let row=0; row<n; row++){
//     let tmpArray = []  
//     for (let col=0; col<n; col++){ 
//       tmpArray.push(row + col)
//     }
//     winningArray.push(tmpArray)
//   }

//   //Make the column winners
//   for (let col=0; col<n; col++){
//     let tmpArray2 = []  
//     for (let row=0; row<n; row++){ 
//       tmpArray2.push([row + col])
//     }
//     winningArray.push(tmpArray2)
//   }

//   //now for the daigs
//   let tmpArray3 = []  
//   for (let diag=0; diag<n; diag++){
//       tmpArray3.push([diag + diag])
//   }
//   winningArray.push(tmpArray3)

//   //now for the diag the other way
//   let tmpArray4 = []  
//   for (let diag=0; diag<n; diag++){
//       tmpArray4.push([diag + (diag-1-n)])
//   }
//   winningArray.push(tmpArray4)

//   return winningArray

// }

const checkForWinnerChickenDinner = () => {
  //Only so many ways to win this game...
  
  //let winningIDCombos = makeWinningCombos(3);
  let winningIDCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  console.log('winningIDCombos:' +JSON.stringify(winningIDCombos));
  console.log('length of winningIDCombos:' + winningIDCombos.length)

  //recreate the 1dimArray to make life easier
  let oneDimensionalArray = [];
  for (let i = 0; i < squares.length; i++) {
    for (let element of squares[i]) {
      oneDimensionalArray.push(element);
    }
  }  
  //Loop through the winning combinations and see if all 3 have the same value
  //if they do, return true.  We know the winner is the currentPlayer
  for (let i = 0; i < winningIDCombos.length; i++) {
    let firstOne = oneDimensionalArray.find((element) => element.id == winningIDCombos[i][0]);
    let secondOne = oneDimensionalArray.find((element) => element.id == winningIDCombos[i][1]);
    let thirdOne = oneDimensionalArray.find((element) => element.id == winningIDCombos[i][2]);

    if (((firstOne.value == secondOne.value) && (secondOne.value == thirdOne.value))&&(firstOne.value !== '_')){
      console.log('WE HAVE A WINNER');
      return true
    } 

  }
  return false

};

  const resetGame = () => {
    // Complete in Wave 4
    let playAgainAnswer = confirm('Play again?')
    if (playAgainAnswer){
      document.location.reload();
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* return value == current player calculated in checkForWinner */}
        <h2>{winnerLabel}</h2> 
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        {/* passing the onClickCallback here; created the  clickSquare function to test it out */}
        <Board squares={squares} onClickCallback={clickSquare} />
      </main>
    </div>
  );
};

export default App;
