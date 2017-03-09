# Mars Rover API definition

## file: rover.js

## Installation
```sh
# Install rover
npm install

# Install jasmine globally (or make sure jasmine is in your path)
npm install -g jasmine

# Run the tests in jasmine
npm run test
```

## API:
### var rover = new Rover(initPoint, initDir, grid) where
* initPoint: is an object representing the x and y coordinates of the starting point, {x: <x-coordinate>, y: <y-coordinate}
* initDir (optional): is the inital direction to which the rover is pointing, values are 'N', 'W', 'E', 'S' for north, west, east and south. If no value is given 'N' is used.
* grid (optional): is a 2D array of the traveral grid. A ' ' in an array element is an area without an obstable. An 'X' indicates an obstacle.  The 2D array is interpreted as a grid with (0,0) as the origin. If no grid parameter is given, a 10x10 grid with no obstacles is used.

### rover.location()
Returns the point location of the rover. The point is of the form {x: <x-coordinate>, y: <y-coordinate}

### rover.direction()
Returns the direction the rover is currently pointing, values are 'N', 'W', 'E', 'S' for north, west, east and south.

### rover.getSize()
Returns size of the grid as an object of the form {x: <x-coordinate>, y: <y-coordinate}

### rover.runCommands(arr) where
arr is an array of commands. Commands can be:
* 'f': go forward one step
* 'b': go back one step
* 'l': turn left
* 'r': turn right






