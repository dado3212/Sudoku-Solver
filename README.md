# Sudoku Solver

### Python Version

On a long plane flight, I got stuck on one of the sudoku puzzles in the back of the book.  So, I decided to see if I could write
a Python program to solve it automatically.  This is the result.

It has an interface so that you can quickly enter in a sudoku puzzle, and either complete to see the solution, or step through move by move.  It allows you to view the grid at any time, in both a small view 
```
9 4 8 | _ 2 _ | 7 _ 5 
_ _ 1 | _ _ 4 | 8 _ 9 
_ _ 6 | _ _ _ | 1 2 4 
------|-------|-------
_ _ _ | _ _ 3 | _ 1 2 
1 _ _ | _ _ _ | _ 7 8 
8 7 2 | 5 _ _ | _ 4 3 
------|-------|-------
_ 8 7 | _ _ _ | 2 9 6 
6 _ _ | 9 _ _ | 3 8 1 
_ 1 9 | _ 8 _ | 4 5 7 
```
and a (considerably) more zoomed in view that displays possible values in the corners.
```
     |     |      # 1   3|     |1   6 #      |3   6|     
  9  |  4  |  8   #      |  2  |      #   7  |     |  5  
     |     |      # 6    |     |      #      |     |     
------------------#-------------------#------------------
2   3|2   3|      # 3   6|3   5|      #      |3   6|     
     |     |  1   #      |     |  4   #   8  |     |  9  
5   7|5    |      # 7    |6   7|      #      |     |     
------------------#-------------------#------------------
3   5|3   5|      # 3   7|3   5|5   7 #      |     |     
     |     |  6   #      |     |      #   1  |  2  |  4  
7    |     |      # 8    |7   9|8   9 #      |     |     
##########################################################
4   5|5   6|4   5 # 4   6|4   6|      # 5   6|     |     
     |     |      #      |     |  3   #      |  1  |  2  
     |9    |      # 7   8|7   9|      # 9    |     |     
------------------#-------------------#------------------
     |3   5|3   4 # 2   4|4   6|2   6 # 5   6|     |     
  1  |     |      #      |     |      #      |  7  |  8  
     |6   9|5     # 6    |9    |9     # 9    |     |     
------------------#-------------------#------------------
     |     |      #      |1   6|1   6 # 6   9|     |     
  8  |  7  |  2   #   5  |     |      #      |  4  |  3  
     |     |      #      |9    |9     #      |     |     
##########################################################
3   4|     |      # 1   3|1   3|1   5 #      |     |     
     |  8  |  7   #      |     |      #   2  |  9  |  6  
5    |     |      # 4    |4   5|      #      |     |     
------------------#-------------------#------------------
     |2   5|4   5 #      |4   5|2   5 #      |     |     
  6  |     |      #   9  |     |      #   3  |  8  |  1  
     |     |      #      |7    |7     #      |     |     
------------------#-------------------#------------------
2   3|     |      # 2   3|     |2   6 #      |     |     
     |  1  |  9   #      |  8  |      #   4  |  5  |  7  
     |     |      # 6    |     |      #      |     |     
```
It also allows you to input row-column pairs to see the possibilities for that spot.  In the above example, (9,1) would output [2,3], the available options for that square.

On [the hardest Sudoku in the world](http://www.telegraph.co.uk/news/science/science-news/9359579/Worlds-hardest-sudoku-can-you-crack-it.html) it takes ~25 seconds to solve.
`800000000003600000070090200050007000000045700000100030001000068008500010090000400`

On a [more average Sudoku, yet still hard](http://www.websudoku.com/?level=4&set_id=3277196119) it takes under 1/10 of a second.
`940020700001004009006000120000003010100000008070500000087000200600900300009080057`

### Web Version

On a similarly long plane ride, I decided to adapt it into a web application.  You can check out the source code on the [`web` branch](tree/web) of this repository, or live at https://alexbeals.com/projects/sudoku.
