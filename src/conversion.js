const board = [
    ['x', 'o', 'x'],
    ['o', 'o', 'x'],
    ['x', '', 'o']
  ]


const isDiagonalWinner1 = coord_set => {

  return (([0,0] in coord_set) && ([1, 1] in coord_set) && ([2, 2] in coord_set))
}

const isDiagonalWinner2 = coord_set => {
  return (([2,0] in coord_set) && ([1, 1] in coord_set) && ([0, 2] in coord_set))
}

const check_for_winner = board => {

    let xPlacements = Set();
    let oPlacements = Set();

    let blanks = 0;
    let winner = null;

    for (const [x, row] of board.entries())
        if (row[0] === row[1] && row[0] === row[2]) {
            winner = row[0];
            return winner
          }
          for (const [y, square] in row.entries()) {
              if (board[0][y] === board[1][y] && board[0][y] === board[2][y]) {
                  winner = board[0][y];
                  return winner
                }  
              
              if (square === "x") {
                xPlacements.add([x, y])
                  if (isDiagonalWinner1(xPlacements) || isDiagonalWinner2(xPlacements)) {
                    winner = square
                    return winner
                  }
                }
                else if (square === "o") {
                  oPlacements.add([x, y])

                  if (isDiagonalWinner1(oPlacements) || isDiagonalWinner2(oPlacements) ) {
                    winner = square
                    return winner
                  }
                } else {
                  blanks++
                }
          };
        if (!winner && blanks === 0) {
          return 'Tie'
        }
    return winner
}




