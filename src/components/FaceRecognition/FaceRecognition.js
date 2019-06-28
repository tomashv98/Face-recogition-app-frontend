import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = props => (
  <div className='center ma'>
    <div className='absolute mt2'>
      {props.imageURL && (
        <img
          id='inputimage'
          width='500px'
          height='auto'
          src={props.imageURL}
          alt=' '
        />
      )}

      {props.boxes.map(box => (
        <div
          key={box.id}
          className='bounding-box'
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        />
      ))}
    </div>
  </div>
);

export default FaceRecognition;

// () =>
