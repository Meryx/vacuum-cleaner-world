

const fillCell = (obstacleChance, dirtChance) => {

  const randomNumberBetweenZeroAndOne = Math.random();
  if(randomNumberBetweenZeroAndOne < obstacleChance){
    return 'OBSTACLE';
  }
  if(randomNumberBetweenZeroAndOne < (obstacleChance + dirtChance)){
    return 'DIRT';
  }
  return 'CLEAN';
}

const fillGrid = (grid, obstacleChance, dirtChance) => {
  return grid.map((row) => {
    return row.map(() => fillCell(obstacleChance, dirtChance));
  });
}


const initGrid = (size) => {
  const grid = Array(size).fill(null).map(() => Array(size).fill(null));
  return grid;
}




const createEnvironmentObject = (size, obstacleChance, dirtChance) => {
  const grid = fillGrid(initGrid(size), obstacleChance, dirtChance);
  grid[0][0] = 'CLEAN';
  const environment = {
    grid: grid,
  };
  return environment;
}

export default createEnvironmentObject;
