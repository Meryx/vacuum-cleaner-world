import React from 'react';
import Square from './Square';

const Row = ({ size, yPosition, vacuumPosition, environment }) => {
  return (
    <div>
      {Array(parseInt(size)).fill(null).map((_, i) =>
        <Square
        key={i}
        yPosition={yPosition}
        xPosition={i}
        vacuumPosition={vacuumPosition}
        environment={environment}
        />
      )}
    </div>
  )
}

export default Row;
