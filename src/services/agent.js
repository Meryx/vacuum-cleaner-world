import mod from '../utility/mod';

const orientation = ['RIGHT', 'TOP', 'LEFT', 'BOTTOM'];




const forward = function(environment, newCoords) {
  const newLocation = environment[newCoords[0]][newCoords[1]];

  if(newLocation === 'OBSTACLE'){
    this.memory = 'BUMPED';
    this.bumped = newCoords;
    return;
  }
  this.visited[newCoords[0]][newCoords[1]] = true;
}


const moveRight = function(environment, newCoords) {

  if(this.index === 1){
    this.turnRight();
  }

  if(this.index === 2){
    this.turnRight();
    this.turnRight();
  }

  if(this.index === 3){
    this.turnLeft();
  }
    this.forward(environment, newCoords);
}

const moveBottom = function(environment, newCoords) {

  if(this.index === 0){
    this.turnRight();
  }

  if(this.index === 1){
    this.turnRight();
    this.turnRight();
  }

  if(this.index === 2){
    this.turnLeft();
  }

  this.forward(environment, newCoords);

}

const moveTop = function(environment, newCoords) {

  if(this.index === 0){
    this.turnLeft();
  }

  if(this.index === 2){
    this.turnRight();
  }

  if(this.index === 3){
    this.turnLeft();
    this.turnLeft();
  }


  this.forward(environment, newCoords);

}

const moveLeft = function(environment, newCoords) {
  if(this.index === 0){
    this.turnRight();
    this.turnRight();
  }

  if(this.index === 1){
    this.turnLeft();
  }

  if(this.index === 3){
    this.turnRight();
  }


  this.forward(environment, newCoords);

}

const turnRight = function()  {
  this.index--;
  this.index = mod(this.index, 4);
  this.orientation = orientation[this.index];
}

const turnLeft = function() {
  this.index++;
  this.index = mod(this.index, 4);
  this.orientation = orientation[this.index];
}



const visit = function(environment, neighbour) {

  const cur = this.location;
  const dec = [cur[0] - neighbour[0], cur[1] - neighbour[1]];

  if(dec[0] === 1){
    this.moveTop(environment, neighbour);
    return;
  }

  if(dec[0] === -1){
    this.moveBottom(environment, neighbour);
    return;
  }

  if(dec[1] === 1){
    this.moveLeft(environment, neighbour);
    return;
  }

  this.moveRight(environment, neighbour);

};

const initAgent = (environment) => {

  const size = environment.grid.length;
  const grid = environment.grid;
  do {
    const home_x_coordinate = Math.floor((Math.random() * (size-1)));
    const home_y_coordinate = Math.floor((Math.random() * (size-1)));
    if(grid[home_x_coordinate][home_y_coordinate] === 'CLEAN'){
      return {
        home: [home_x_coordinate, home_y_coordinate],
        location: [home_x_coordinate, home_y_coordinate],
        memory: '',
        index: 1,
        orientation: orientation[1],
        visited: Array(size).fill(null).map(() => Array(size).fill(false)),
        stack: [],
        visit: visit,
        started: false,
        done: false,
        moveRight,
        moveLeft,
        moveTop,
        moveBottom,
        forward,
        turnRight,
        turnLeft,

      };
    }
  } while(true);
}

export default initAgent;
