import React from 'react';
import Row from './Row';
import './board.css';


const Board = ({ size, vacuumPosition, environment }) => {
  let array = Array(parseInt(size)).fill(null);
  return (
    <div className='game'>
      {array.map((_, i) =>
          <Row
          size={size}
          key={i}
          yPosition={i}
          vacuumPosition={vacuumPosition}
          environment={environment}
          />
        )
      }
    </div>
  )

}

export default Board;
