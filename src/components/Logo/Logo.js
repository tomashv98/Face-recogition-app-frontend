import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import rice from './rice.png';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt
        className='Tilt br2 shadow-2'
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className='Tilt-inner'>
          <img style={{ paddingTop: '5px' }} src={rice} alt='Rice inc.' />{' '}
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

/*<div>Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>*/
