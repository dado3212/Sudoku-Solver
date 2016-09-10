var grid = [];

// Clears the grid to all clear
function resetGrid() {
  grid = [];
  for (var row = 0; row < 9; row++) {
    var rowValues = [];
    for (var col = 0; col < 9; col++) {
      rowValues.push(0);
    }
    grid.push(rowValues);
  }
}

function initialize() {
  resetGrid();

  // Easy Grid
  // grid = [
  //   [9, 0, 0, 5, 8, 0, 0, 2, 0],
  //   [0, 0, 4, 0 , 0, 9, 5, 0, 0],
  //   [1, 8, 0, 2, 0, 6, 0, 0, 9],
  //   [4, 6, 0, 0, 3, 8, 7, 0, 0],
  //   [0, 0, 0, 0, 5, 0, 0, 0, 0],
  //   [0, 0, 3, 1, 7, 0, 0, 4, 6],
  //   [6, 0, 0, 8, 0, 7, 0, 5, 2],
  //   [0, 0, 9, 3, 0, 0, 6, 0, 0],
  //   [0, 5, 0, 0, 6, 1, 0, 0, 7]
  // ];

  // Medium Grid
  // grid = [
  //   [1, 0, 0, 0, 0, 9, 3, 0, 0],
  //   [6, 0, 0, 0, 0, 8, 7, 5, 0],
  //   [0, 0, 4, 0, 5, 1, 0, 8, 0],
  //   [5, 0, 0, 8, 0, 0, 0, 3, 6],
  //   [0, 7, 0, 0, 9, 0, 0, 1, 0],
  //   [9, 8, 0, 0, 0, 5, 0, 0, 7],
  //   [0, 9, 0, 5, 8, 0, 6, 0, 0],
  //   [0, 6, 7, 2, 0, 0, 0, 0, 5],
  //   [0, 0, 5, 9, 0, 0, 0, 0, 2]
  // ];

  // Hard Grid
  // grid = [
  //   [9, 4, 0, 0, 2, 0, 7, 0, 0],
  //   [0, 0, 1, 0, 0, 4, 0, 0, 9],
  //   [0, 0, 6, 0, 0, 0, 1, 2, 0],
  //   [0, 0, 0, 0, 0, 3, 0, 1, 0],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 8],
  //   [0, 7, 0, 5, 0, 0, 0, 0, 0],
  //   [0, 8, 7, 0, 0, 0, 2, 0, 0],
  //   [6, 0, 0, 9, 0, 0, 3, 0, 0],
  //   [0, 0, 9, 0, 8, 0, 0, 5, 7]
  // ];

  // Impossible Grid
  // grid = [
  //   [8, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 3, 6, 0, 0, 0, 0, 0],
  //   [0, 7, 0, 0, 9, 0, 2, 0, 0],
  //   [0, 5, 0, 0, 0, 7, 0, 0, 0],
  //   [0, 0, 0, 0, 4, 5, 7, 0, 0],
  //   [0, 0, 0, 1, 0, 0, 0, 3, 0],
  //   [0, 0, 1, 0, 0, 0, 0, 6, 8],
  //   [0, 0, 8, 5, 0, 0, 0, 1, 0],
  //   [0, 9, 0, 0, 0, 0, 4, 0, 0]
  // ];

  // Build board
  var html = '';

  for (var row = 0; row < 9; row++) {
    html += '<div class="row">';
    for (var col = 0; col < 9; col++) {
      if (grid[row][col] == 0) {
        html += '<input type="text" data-row="' + row + '" data-col="' + col + '">';
      } else {
        html += '<input type="text" class="user" data-row="' + row + '" data-col="' + col + '" value="' + grid[row][col] + '">';
      }
    }
    html += '</div>';
  }
  $('#board').html(html);

  // Set up listeners
  var inputs = $('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onkeyup = function() {
      // Update grid
      var row = $(this).data('row');
      var col = $(this).data('col');

      grid[row][col] = Number.parseInt($(this).val());
      if (!Number.isInteger(grid[row][col]) || (grid[row][col] < 0 || grid[row][col] > 9)) {
        grid[row][col] = 0;
      }

      drawGrid(grid, true);

      // Check if still valid
      if (isValid(grid)) {
        $('.alert').removeClass().addClass('alert valid').html('Valid board.');
        document.getElementsByClassName('next')[0].disabled = false;
        document.getElementsByClassName('finish')[0].disabled = false;
        document.getElementsByClassName('finishanim')[0].disabled = false;
      } else {
        $('.alert').removeClass().addClass('alert invalid').html('Invalid board.');
        document.getElementsByClassName('next')[0].disabled = true;
        document.getElementsByClassName('finish')[0].disabled = true;
        document.getElementsByClassName('finishanim')[0].disabled = true;
      }
    };

    inputs[i].onmouseup = function() {
      var row = $(this).data('row');
      var col = $(this).data('col');

      $('.possible').html('Possible values: ' + findPossible(row, col, grid));
    };
  }
}

// Checks if the grid is valid
function isValid(grid) {
  // Check that there are no repeats in the rows
  for (var row = 0; row < 9; row++) {
    var found = [];
    for (var col = 0; col < 9; col++) {
      if (found.indexOf(grid[row][col]) > -1) {
        return false;
      } else if (grid[row][col] != 0) {
        found.push(grid[row][col]);
      }
    }
  }

  // Check that there are no repeats in the columns
  for (var col = 0; col < 9; col++) {
    var found = [];
    for (var row = 0; row < 9; row++) {
      if (found.indexOf(grid[row][col]) > -1) {
        return false;
      } else if (grid[row][col] != 0) {
        found.push(grid[row][col]);
      }
    }
  }

  // Check that there are no repeats in any box
  for (var row_g = 0; row_g < 3; row_g++) {
    for (var col_g = 0; col_g < 3; col_g++) {
      // For a given box, see if valid
      var found = [];
      for (var row = row_g*3; row < row_g*3 + 3; row++) {
        for (var col = col_g*3; col < col_g*3 + 3; col++) {
          if (found.indexOf(grid[row][col]) > -1) {
            return false;
          } else if (grid[row][col] != 0) {
            found.push(grid[row][col]);
          }
        }
      }
    }
  }

  return true;
}

// Check if there are any remaining moves
function hasMoves(grid) {
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (grid[row][col] == 0) {
        return true;
      }
    }
  }

  return false;
}

// Returns a list of all possible values for a specific row/column index
function findPossible(row_i, col_i, grid) {
  var possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (grid[row_i][col_i] == 0) {
    // Check all values in the same row
    for (var col = 0; col < 9; col++) {
      if (possible.indexOf(grid[row_i][col]) > -1) {
        possible.splice(possible.indexOf(grid[row_i][col]), 1);
      }
    }

    // Check all values in the same column
    for (var row = 0; row < 9; row++) {
      if (possible.indexOf(grid[row][col_i]) > -1) {
        possible.splice(possible.indexOf(grid[row][col_i]), 1);
      }
    }

    // Check all values in the same box
    for (var row = (row_i - (row_i % 3)); row < (row_i - (row_i % 3)) + 3; row++) {
      for (var col = (col_i - (col_i % 3)); col < (col_i - (col_i % 3)) + 3; col++) {
        if (possible.indexOf(grid[row][col]) > -1) {
          possible.splice(possible.indexOf(grid[row][col]), 1);
        }
      }
    }

    return possible;
  } else {
    return [];
  }
}

// 
function testPossible(row_i, col_i, val, grid, depth, finish) {
  var dup = JSON.parse(JSON.stringify(grid));
  dup[row_i][col_i] = val;
  if (finishGrid(dup, false, depth)) {
    if (finish) {
      for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
          grid[row][col] = dup[row][col];
        }
      }
    }
    return true;
  } else {
    return false;
  }
}

// Attempts to find the next move
function nextMove(grid, depth = 0, finish = false) {
  var foundMove = false;

  // Check if there are any squares that have just one option
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      var possible = findPossible(row, col, grid);
      if (possible.length == 1 && !foundMove) {
        grid[row][col] = possible[0];
        foundMove = true;
      }
    }
  }

  // Check by number
  if (!foundMove) {
    for (val = 1; val <= 9; val++) {
      // Check by row
      if (!foundMove) {
        for (var row = 0; row < 9; row++) {
          var row_opts = [];
          for (var col = 0; col < 9; col++) { // Get all the squares in the row that have `val` as an option
            if (findPossible(row, col, grid).indexOf(val) > -1) {
              row_opts.push([row, col]);
            }
          }

          if (row_opts.length == 1 && !foundMove) { // If only one square in the row has that option, it must be it
            grid[row_opts[0][0]][row_opts[0][1]] = val;
            foundMove = true;
          }
        }
      }

      // Check by column
      if (!foundMove) {
        for (var col = 0; col < 9; col++) {
          var col_opts = [];
          for (var row = 0; row < 9; row++) { // Get all the squares in the column that have `val` as an option
            if (findPossible(row, col, grid).indexOf(val) > -1) {
              col_opts.push([row, col]);
            }
          }

          if (col_opts.length == 1 && !foundMove) { // If only one square in the column has that option, it must be it
            grid[col_opts[0][0]][col_opts[0][1]] = val;
            foundMove = true;
          }
        }
      }

      // Check by box
      if (!foundMove) {
        for (var col_g = 0; col_g < 3; col_g++) {
          for (var row_g = 0; row_g < 3; row_g++) { // Run through each box
            // Get all possible values in the box
            var box_opts = [];
            for (var row = row_g*3; row < row_g*3 + 3; row++) {
              for (var col = col_g*3; col < col_g*3 + 3; col++) {
                if (findPossible(row, col, grid).indexOf(val) > -1) {
                  box_opts.push([row, col]);
                }
              }
            }

            if (box_opts.length == 1 && !foundMove) {
              grid[box_opts[0][0]][box_opts[0][1]] = val;
              foundMove = true;
            }
          }
        }
      }
    }
  }

  // When all else fails, guess like a madman
  if (!foundMove && depth < 2) {
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        if (!foundMove) {
          var possible = findPossible(row, col, grid);
          for (var val of possible) {
            if (!foundMove && testPossible(row, col, val, grid, depth + 1, finish)) {
              grid[row][col] = val;
              foundMove = true;
            }
          }
        }
      }
    }
  }

  drawGrid(grid);

  return foundMove;
}

function finishGrid(grid, animate = false, depth = 0) {
  var moved = true;

  if (animate) {
    if (hasMoves(grid) && moved) {
      moved = nextMove(grid, depth, false);
      setTimeout(function() {
        finishGrid(grid, animate, depth);
      }, 50);
    }
  } else {
    while (hasMoves(grid) && moved) {
      moved = nextMove(grid, depth, true);
    }
  }

  return !hasMoves(grid);
}

// Renders the current state of the grid
function drawGrid(grid, user = false) {
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (grid[row][col] == 0) {
        $('input[data-row="' + row + '"][data-col="' + col + '"]').removeClass().val('');
      } else {
        if (user) {
          $('input[data-row="' + row + '"][data-col="' + col + '"]').removeClass().addClass('user').val(grid[row][col]);
        } else {
          $('input[data-row="' + row + '"][data-col="' + col + '"]').val(grid[row][col]);
        }
      }
    }
  }
}

$(document).ready(function() {
  // Handle reset button
  $('button.reset').on('click', function() {
    initialize();
  });

  // Handle next move button
  $('button.next').on('click', function() {
    if (isValid(grid)) {
      nextMove(grid);
    }
  });

  // Handle finish buttons
  $('button.finish').on('click', function() {
    if (isValid(grid)) {
      finishGrid(grid, false);
    }
  });

  $('button.finishanim').on('click', function() {
    if (isValid(grid)) {
      finishGrid(grid, true);
    }
  });

  initialize();
});