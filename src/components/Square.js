import React from 'react';
import './square.css';
import vacRef from '../vac.svg';
import dirtRef from '../dirt.png';
import obsRef from '../wardrobe.png';

const Square = ({ vacuumPosition, yPosition, xPosition, environment }) => {
  let src;
  const cond = (vacuumPosition[0] === yPosition && vacuumPosition[1] === xPosition);
  const dirt = (environment.grid[yPosition][xPosition] === 'DIRT');
  const obstacle = (environment.grid[yPosition][xPosition] === 'OBSTACLE');

    if(obstacle){
      src = obsRef;
    }else if(cond){
      src = vacRef;
    }else{
      src = dirtRef
    }



  if(!vacuumPosition){
    return(
      <>

      </>
    )
  }


  if(obstacle){
    return(
      <div className='square'>
        <img src={src} alt="Obstacle" / >
       </div>
    )
  }
  if(cond){
    return(
      <div className='square'>
             <img src={src} alt="Vacuum cleaner" / >
       </div>
    )
  }
  return (
    <div className='square'>

       {
         dirt &&
         <img src={src} alt="Dirt" / >
       }
    </div>


  )
}

export default Square;
