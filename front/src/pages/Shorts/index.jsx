import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const Shorts = () => {
  return (
    <HTMLFlipBook width={400} height={600}>
      <div className='demoPage'>Page 1</div>
      <div className='demoPage'>Page 2</div>
      <div className='demoPage'>Page 3</div>
      <div className='demoPage'>Page 4</div>
    </HTMLFlipBook>
  );
};

export default Shorts;
