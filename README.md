![Nonogram](/src/assets/screenshot.png)
# nonochill <sup>v.2</sup>
My Second nonogram game implementation using Vue. Play it [here](https://nonochill.jzumun.ph/).

This is basically a rewrite of the [first one](https://github.com/JZumun/nonochill), using Vue ***single file components*** to better break up the logic and allow me to add some new features more easily.

## What's a Nonogram?
[Nonograms](https://en.wikipedia.org/wiki/Nonogram) according to wikipedia are “picture logic puzzles in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden picture.” More details, as well as some tips on solving nonograms, can be found on that link.

## What's new from <mark>v.1</mark>?
- **History** - The ability to undo and redo moves has replaced the `tentative move` option of <mark>v.1</mark>.
- **Multiple Colors** - There's now an option to increase the number of colors in a puzzle, up to 5.
- **Tutorial Mode** - A basic guide walks you through a sample puzzle.
- **Image-based Puzzle Creation** (experimental) - Create a puzzle based on an image.
- **Automated Solver** - An automated solver for when you just want to see a puzzle fill itself. Powered by [JZumun/nonogram-solver](https://github.com/JZumun/nonogram-solver).

## Issues
The puzzles here are randomly generated, so the picture they create don’t depict anything.

It is possible that a puzzle generated by this code has more than one solution
