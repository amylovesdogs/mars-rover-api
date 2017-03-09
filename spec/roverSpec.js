describe("Mars Rover", function() {
  var Rover = require('../rover');

  describe('You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing', function() {
    it('should set starting location', function() {
      var rover = new Rover({x: 5, y: 7});
      expect(rover.location().x).toEqual(5);
      expect(rover.location().y).toEqual(7);
    });
    it('should use default starting location value 0x0 when not assigned', function() {
      var rover = new Rover();
      expect(rover.location().x).toEqual(0);
      expect(rover.location().y).toEqual(0);
    });
    it('should set direction as north', function() {
      var rover = new Rover({x: 5, y: 7}, 'N');
      expect(rover.direction()).toEqual('N');
    });
    it('should use default starting direction value N when not assigned', function() {
      var rover = new Rover({x: 5, y: 7});
      expect(rover.direction()).toEqual('N');
    });
  });

  describe('Implement commands that move the rover forward/backward (f,b)', function() {
    it('should increase Y when moving north', function() {
      var rover = new Rover({x: 0, y: 0}, 'N');
      rover.runCommands(['f', 'f']);
      expect(rover.location().x).toEqual(0);
      expect(rover.location().y).toEqual(2);
    });
    it('should decrease Y when moving south', function() {
      var rover = new Rover({x: 0, y: 3}, 'S');
      rover.runCommands(['f']);
      expect(rover.location().x).toEqual(0);
      expect(rover.location().y).toEqual(2);
    });
    it('should decrease X when moving west', function() {
      var rover = new Rover({x: 5, y: 5}, 'W');
      rover.runCommands(['f']);
      expect(rover.location().x).toEqual(4);
      expect(rover.location().y).toEqual(5);
    });
    it('should increase X when moving east', function() {
      var rover = new Rover({x: 5, y: 5}, 'E');
      rover.runCommands(['f']);
      expect(rover.location().x).toEqual(6);
      expect(rover.location().y).toEqual(5);
    });
    it('should decrease Y when moving backwards facing north', function() {
      var rover = new Rover({x: 5, y: 5}, 'N');
      rover.runCommands(['b']);
      expect(rover.location().x).toEqual(5);
      expect(rover.location().y).toEqual(4);
    });
    it('should increase Y when moving backwards facing south', function() {
      var rover = new Rover({x: 5, y: 5}, 'S');
      rover.runCommands(['b']);
      expect(rover.location().x).toEqual(5);
      expect(rover.location().y).toEqual(6);
    });
    it('should increase X when moving backwards facing west', function() {
      var rover = new Rover({x: 5, y: 5}, 'W');
      rover.runCommands(['b']);
      expect(rover.location().x).toEqual(6);
      expect(rover.location().y).toEqual(5);
    });
    it('should reduce X when moving backwards facing east', function() {
      var rover = new Rover({x: 5, y: 5}, 'E');
      rover.runCommands(['b']);
      expect(rover.location().x).toEqual(4);
      expect(rover.location().y).toEqual(5);
    });
  });

  describe('Implement commands that turn the rover left/right (l,r)', function() {
    it('should change direction from E to N when command is to turn left', function() {
      var rover = new Rover({x: 5, y: 5}, 'E');
      rover.runCommands(['l']);
      expect(rover.direction()).toEqual('N');
    });
    it('should change direction from N to W when command is to turn left', function() {
      var rover = new Rover({x: 5, y: 5}, 'N');
      rover.runCommands(['l']);
      expect(rover.direction()).toEqual('W');
    });
    it('should change direction from W to S when command is to turn left', function() {
      var rover = new Rover({x: 5, y: 5}, 'W');
      rover.runCommands(['l']);
      expect(rover.direction()).toEqual('S');
    });
    it('should change direction from S to E when command is to turn left', function() {
      var rover = new Rover({x: 5, y: 5}, 'S');
      rover.runCommands(['l']);
      expect(rover.direction()).toEqual('E');
    });
    it('should change direction from N to E when command is to turn right', function() {
      var rover = new Rover({x: 5, y: 5}, 'N');
      rover.runCommands(['r']);
      expect(rover.direction()).toEqual('E');
    });
    it('should change direction from E to S when command is to turn right', function() {
      var rover = new Rover({x: 5, y: 5}, 'E');
      rover.runCommands(['r']);
      expect(rover.direction()).toEqual('S');
    });
    it('should change direction from S to W when command is to turn right', function() {
      var rover = new Rover({x: 5, y: 5}, 'S');
      rover.runCommands(['r']);
      expect(rover.direction()).toEqual('W');
    });
    it('should change direction from W to N when command is to turn right', function() {
      var rover = new Rover({x: 5, y: 5}, 'W');
      rover.runCommands(['r']);
      expect(rover.direction()).toEqual('N');
    });
  });

  describe('Generate grid to use, verify wrapping works correctly', function() {
    var grid;
    beforeEach(function() {
      // create a 5x8 grid with no obstacles
      grid = [];
      for (let x = 0; x < 5; x++) {
        let row = [];
        for (let y = 0; y < 8; y++) {
          row.push(' ');
        }
        grid.push(row);
      }
    });

    it('should use default value 10x10 when grid is not passed in', function() {
      var rover = new Rover({x: 5, y: 5}, 'W');
      expect(rover.gridSize().x).toEqual(10);
      expect(rover.gridSize().y).toEqual(10);
    });
    it('should assign grid size correctly when grid is passed in', function() {
      var rover = new Rover({x: 5, y: 5}, 'W', grid);
      expect(rover.gridSize().x).toEqual(5);
      expect(rover.gridSize().y).toEqual(8);
    });
    it('should return 0 for X when east edge of grid is passed', function() {
      var rover = new Rover({x: 4, y: 0}, 'E', grid);
      rover.runCommands(['f']);
      expect(rover.location().x).toEqual(0);
      expect(rover.location().y).toEqual(0);
    });
    it('should return 4 for X when west edge of grid is passed', function() {
      var rover = new Rover({x: 0, y: 0}, 'W', grid);
      rover.runCommands(['f']);
      expect(rover.location().x).toEqual(4);
      expect(rover.location().y).toEqual(0);
    });
    it('should return 0 for y when north edge of grid is passed', function() {
      var rover = new Rover({x: 0, y: 7}, 'N', grid);
      rover.runCommands(['f']);
      expect(rover.location().x).toEqual(0);
      expect(rover.location().y).toEqual(0);
    });
    it('should return 7 for y when south edge of grid is passed', function() {
      var rover = new Rover({x: 0, y: 0}, 'S', grid);
      rover.runCommands(['f']);
      expect(rover.location().x).toEqual(0);
      expect(rover.location().y).toEqual(7);
    });
  });
});
