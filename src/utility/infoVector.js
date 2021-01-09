const genVector = (environment, agent) => {
  const informationVector = [];
  informationVector.push(agent.memory === 'BUMPED' ? 1 : 0);
  informationVector.push(environment[agent.location[0]][agent.location[1]] === 'DIRT' ? 1 : 0);
  informationVector.push((agent.location[0] === agent.home[0] && agent.location[1] === agent.home[1]) ? 1 : 0);
  return informationVector;
}

export default genVector;
