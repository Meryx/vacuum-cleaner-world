import React from 'react';
import { useState, useEffect } from 'react';
import Board from './Board';
import createEnvironmentObject from '../services/environment';
import initAgent from '../services/agent';
import genVector from '../utility/infoVector';
import { getNeighbours } from '../utility/graphUtility';
import './controls.css';

const Controls = () => {
  const [size, setSize] = useState(6);
  const [obstacleChance, setObstacleChance] = useState(0.2);
  const [dirtChance, setDirtChance] = useState(0.3);
  const [vacuumPosition, setPosition] = useState(null);
  const [environment, setEnvironment] = useState(null);
  const [agent, setAgent] = useState(null);


  const clean = function(e, location) {
    const copy = {
      grid: e.grid.map((row, i) => i === location[0] ? row.map((cell, j) => j === location[1] ? 'CLEAN' : cell) : row),
    }
    return copy;
  }

  const isVisited = (cords, a) => {

    if(a.visited[cords[0]][cords[1]]){
      return true;
    }
    return false;
  }



const chooseNeighbour = (a) => {

  const neighbours = getNeighbours(a.location, size);
  for (let i = 0; i < neighbours.length; i++) {
    if(!isVisited(neighbours[i], a)){
      return neighbours[i];
    }
  }

  return null;

};



const move = (e, a) =>{
    const toVisit = chooseNeighbour(a);
    if(toVisit){
      a.visit(e, toVisit);
      if(a.memory !== 'BUMPED'){
        a.stack.push(toVisit);
        a.location = toVisit;
      }
      return;
    }

    a.stack.pop();
    if(a.stack.length === 0){
      a.done = true;
      return;
    }
    a.visit(e, a.stack[a.stack.length - 1]);
    a.location = a.stack[a.stack.length -1];
  }

  const init = () => {
    const tempEnv = createEnvironmentObject(parseInt(size), parseFloat(obstacleChance), parseFloat(dirtChance));
    const tempAgent =  initAgent(tempEnv);
    const tempPosition = tempAgent.location
    setEnvironment({...tempEnv});
    setAgent({...tempAgent});
    setPosition(tempPosition);
  }

  useEffect(init , [size, obstacleChance, dirtChance]);


  useEffect(() => {
    if(agent){
      setPosition(agent.location);
    }
  }, [agent]);

  useEffect(() => {
    if(agent && environment){
      if(agent.started){
        let copy = {...environment};
        let agentCopy = {...agent};
        setTimeout(() => {
          const vector = genVector(copy.grid, agent);
          if(vector[1] === 1){
            copy = clean(copy, agentCopy.location);
          }
          if(vector[0] === 1){
            agentCopy.visited[agentCopy.bumped[0]][agentCopy.bumped[1]] = true;
            agentCopy.memory = '';
          }
          move(copy.grid, agentCopy);
          if(!agent.done){
            setEnvironment({...copy});
            setAgent({...agentCopy});
          }
        }, 400);
      }

    }
  }, [agent]);


  const start = () => {
    const s = []
    s.push(agent.location);
    const tempAgent = {
      ...agent,
      stack: s,
      visited: agent.visited.map((_, i) => i === agent.location[0] ? agent.visited[i].map((_, j) => j === agent.location[1] ? true : agent.visited[i][j]) : [...agent.visited[i]]),
      started: true,
    };
    setAgent(tempAgent);
  }


  return (
  <div className="all">
  <h1 className="vacuum-cleaner-header">Vacuum-Cleaner World Simulator</h1>
  <div className="layout">

    <div className="controls">
      <div className="size">
        <label>Grid size</label>
        <select className="config-selection" value={size} onChange={(e) => {
          setSize(e.target.value)
          setEnvironment(null);
        }}>
          {Array(7).fill(null).map((_, i) => {
            return(
              <option value={i+2} key={i}>
                {i+2}
              </option>
            )
          })}
        </select>
      </div>
      <div className="obstacle-chance">
        <label>Obstalce chance</label>
        <input className="config-selection" type="text" value={obstacleChance} onChange={(e) => {
          setObstacleChance(e.target.value);
          setEnvironment(null);
        }}/>
      </div>
      <div className="dirt-chance">
        <label>Dirt chance</label>
        <input className="config-selection" type="text" value={dirtChance} onChange={(e) => {
          setDirtChance(e.target.value);
          setEnvironment(null);
        }} />
      </div>
    </div>








      </div>
      <div className="buttons">
        <button className="config-button" type="button" onClick={ () => {
          init();

        }}>Generate</button>
        <button className="config-button" type="button" onClick={() => {
          setTimeout(start, 1000);
        }}>Start</button>
      </div>
      {
        (size !== '' &&
        environment) ?
        <Board
        size={size}
        dirtChance={dirtChance}
        obstacleChance={obstacleChance}
        vacuumPosition={vacuumPosition}
        environment={environment}/> : <></>
      }

    </div>
  )
}


export default Controls;
