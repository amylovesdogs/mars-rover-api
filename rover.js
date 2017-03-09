const GRID_WIDTH = 10;
const GRID_LENGTH = 10;
const DIRECTIONS = ['N', 'E', 'S', 'W'];

function genDefault () {
  var grid = [];
  for (let j = 0; j < GRID_LENGTH; j++) {
    let row = [];
    for (let i = 0; i < GRID_WIDTH; i++) {
      row.push(' ');
    }
    grid.push(row);
  }
  return grid;
}

var defaultGrid = genDefault();

function Rover (point, dir, grid) {
  this._location = point || {x: 0, y: 0};
  this._facing = dir || 'N';
  this._grid = grid || defaultGrid;
}

Rover.prototype.location = function () {
  return this._location;
};

Rover.prototype.direction = function () {
  return this._facing;
};

Rover.prototype.gridSize = function () {
  return {x: this._grid.length, y: this._grid[0].length};
};

Rover.prototype.goNorth = function () {
  this._location.y = (this._location.y + 1) % this._grid[0].length;
};

Rover.prototype.goSouth = function () {
  var len = this._grid[0].length;
  this._location.y = (this._location.y - 1) % len;
  if (this._location.y < 0) {
    this._location.y = len + this._location.y;
  }
};

Rover.prototype.goEast = function () {
  this._location.x = (this._location.x + 1) % this._grid.length;
};

Rover.prototype.goWest = function () {
  this._location.x = (this._location.x - 1) % this._grid.length;
  if (this._location.x < 0) {
    this._location.x = this._grid.length + this._location.x;
  }
};

Rover.prototype.forwardOne = function () {
  switch (this._facing) {
    case 'N':
      this.goNorth();
      break;
    case 'S':
      this.goSouth();
      break;
    case 'E':
      this.goEast();
      break;
    case 'W':
      this.goWest();
      break;
  }
};

Rover.prototype.backwardOne = function () {
  switch (this._facing) {
    case 'N':
      this.goSouth();
      break;
    case 'S':
      this.goNorth();
      break;
    case 'E':
      this.goWest();
      break;
    case 'W':
      this.goEast();
      break;
  }
};

Rover.prototype.turn = function (dir) {
  var current = DIRECTIONS.indexOf(this._facing);
  var next;
  if (dir === 'r') {
    next = (current + 1) % DIRECTIONS.length;
  } else {
    next = (current - 1) % DIRECTIONS.length;
    if (next < 0) next = DIRECTIONS.length + next;
  }
  this._facing = DIRECTIONS[next];
};

Rover.prototype.runCommands = function (arr) {
  arr.forEach(command => {
    switch (command) {
    case 'f':
      this.forwardOne();
      break;
    case 'b':
      this.backwardOne();
      break;
    case 'l':
    case 'r':
      this.turn(command);
      break;
    }
  });
};

module.exports = Rover;
