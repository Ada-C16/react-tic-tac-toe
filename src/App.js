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
  const [winner, setWinner] = useState('');
  let string = null;
  
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const updateSquares = (id) => {
    console.log('Hey we are in update squares');
    let newSquares = [];
    let strVal = '';
    strVal = turn==true? 'X':'O';
    for (let row of squares){
      let newRow = row.map((square)=>{
        if (square.id===id) {
          square.value = strVal;
          return square;
          } 
        return square;
        });
    newSquares.push(newRow);
  }
    let newTurn = !turn;
    setTurn(newTurn);
    setSquares(newSquares);
    checkForWinner();
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

    const winning = [ new Set([0,3,6]), new Set([1,4,7]), new Set([2,5,8]), new Set ([0,1,2]),
    new Set([3,4,5]), new Set([6,7,8]),new Set([0,8,4]),new Set([2,4,6])];
    
    let count = 0;

    const xSet=new Set();
    const oSet= new Set();
      for(let row of squares){
        for (let element of row){
          console.log('element=', element);
          if (element.value === 'X'){
            xSet.add(count);
          } else if (element.value === 'O') {
            oSet.add(count);
          }
          count ++;
        }
      }
    const myX = [];

    console.log('xSet', xSet);
    console.log('oSet', oSet);

    for (let combo of winning){
      if (isSuperset(xSet,combo)){
        myX.push(combo);
      }
    }
      // const myO=winning.filter((val)=>{
      //   isSuperset(oSet,val);
      // });
    const myO = [];
    for (let combo of winning){
      if (isSuperset(oSet,combo)){
        myO.push(combo);
      }
    }
    
    console.log('myX', myX);
    console.log('myO', myO);

    if (myX.length > myO.length) {
      string = 'X';
    } else if (myO.length > myX.length){
      string = 'O';
    } else if ((oSet.size + xSet.size) === 9){
      string = 'Tie';
    } else {
      string = '';
    }
    setWinner(string);
    return string;
  };

  const isSuperset = (set, subset) => {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
};
  
const resetGame = () => {
    setSquares(generateSquares());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner ... {winner} </h2>
        <button onClick={()=>{resetGame();}}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquares}/>
      </main>
    </div>
  );
};

export default App;
