

export const getNeighbours = (cell, size) => {
  const RIGHT_WALL = size - 1;
  const BOTTOM_WALL = size - 1;

  const neighbours = [];
  const x_coordinate = cell[0];
  const y_coordinate = cell[1];


  if(y_coordinate < RIGHT_WALL){
    neighbours.push([x_coordinate, y_coordinate + 1]);
  }
  if(x_coordinate > 0){
    neighbours.push([x_coordinate - 1, y_coordinate]);
  }

  if(y_coordinate > 0){
    neighbours.push([x_coordinate, y_coordinate - 1]);
  }

  if(x_coordinate < BOTTOM_WALL){
    neighbours.push([x_coordinate + 1, y_coordinate]);
  }

  return neighbours;

}
