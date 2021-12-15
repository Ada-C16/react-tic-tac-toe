# Components

- App:
  - Type: Container
  - Responsibility: Hold game data, player information, determine winner, render board
  - State:
  
  --> Board:
    - Type: Presentational
    - Responsibility: Render 3/3 grid of squares
    - State: 

    --> Square
        - Type: Presentational
        - Responsibility: Render and X, O, or empty string. When it's clicked, it should update the game's state.

# Wave 1
Summary: Render a board with a 3/3 grid of squares that display their value (I'm guessing the starting value is an empty string)

`App`
  - Must pass props `squares` (2d array) and `onClickCallback` to `Board`

`Board`
  - Must pass props `value` (a string), `onClickCallback` (a function), and `id` to `Square`
  - Buttons should have class `.grid button`
  - 

A. Represent the state of the board in a 2D array of objects (use the helper function `generateSquares` to create the initial value of the state)
B. Render a `Board` 
    - The board should render nine `Square` components, passing the appropriate information from the game state to each square.
    - use the function `generateSquareComponents` to take in a 2D array and transform it into a 1D array of nine `Square` components.
C. Render the `Square`s.
    - Displays the value passed into it
    - Holds and id, which will be used for event handling

## Tests
The tests verify that Square and Board components are rendered and that the Square component displays an X, O, or ""

# Wave 2
Summary: Handle click functionality in squares; update the game state when the user clicks on a square

Wave 2 tests are skipped by default right now; unskip them when working on Wave 2.

# Wave 3
Check to see if there is a winner; if there is a winner, their name shows up.

Must unskip Wave 3 tests as well when working on wave 3.