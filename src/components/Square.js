import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';
import currentPlayer from './App.js'

//dont know if this is right
// import './App.js';

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on

  const onClickCallBack = () => {
    if (currentPlayer === player1) {
      //switch current player
      //pass in the id of the square that was clicked
      //change that .value to X or O
      props.value = 'X';
      currentPlayer = player2;
            
         
    } else if (currentPlayer === player2) {
        props.value = 'O';
        currentPlayer = player1;

  };

  
  }
  
  return <button className='square' onClick={() => this.onClickCallBack(props)}>{props.value}</button>;





Square.propTypes = {
  value: PropTypes.string.isRequired, //We need an X or O as a string
  onClickCallback: PropTypes.func.isRequired, //we need a function here
  id: PropTypes.number.isRequired, //we need the id of the square
};

export default Square;



// const updateStudentData = updatedStudent => {
//   const students = studentData.map(student => {
//     if (student.id === updatedStudent.id) {
//       return updatedStudent;
//     } else {
//       return student;
//     }
//   });

//   setStudentData(students);
// };


//where do i want the function changeSquare to be triggered?
// Wave 2
// You will need to create a method to change the square
//   When it is clicked on.
//   Then pass it into the squares as a callback

// a.map(item => {

//   return <FlatButton
//    label={item.regionName}
//    primary={true}
//    onClick={() => this.handleRegionClick(item.id)} />

// })


// const onClickCallback = (props) => {
  //   if (currentPlayer === player1) {
  //     //switch current player
  //     //pass in the id of the square that was clicked
  //     //change that .value to X or O
  //     props.value = 'X';
  //     currentPlayer = player2;
  //     return props;
      
  //     //make value of that square the corresponsing letter
  //   } else if (currentPlayer === player2) {
  //     props.value = 'O';
  //     currentPlayer = player1;
  //     return props;
  //   }
  // };


  // const onClickCallBack = ? => {
  //   const indivSquares = squares.map(square => {
  //     if (currentPlayer === player1) {
  //       //switch current player
  //       //pass in the id of the square that was clicked
  //       //change that .value to X or O
  //       square.value = 'X';
  //       currentPlayer = player2;
        
     
  //     } else if (currentPlayer === player2) {
  //       square.value = 'O';
  //       currentPlayer = player1;
        

  //     else {
        
  //     }
  //   })