import React from 'react';
import './FaceRecognition.css';

class FaceRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { imageURL, box } = this.props;
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
          <img
            id='inputimage'
            width='500px'
            height='auto'
            src={imageURL}
            alt=' '
          />
          <div
            className='bounding-box'
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          />
        </div>
      </div>
    );
  }
}

export default FaceRecognition;

// () =>
