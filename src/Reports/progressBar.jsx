// Ajhar-progressBar.jsx-10-07-2024-lineNo- 1 to 34


import React from 'react';
import '../Reports/progressBar.css';

const ProgressBar = () => {
  return (
    <div className="progress-bar">

      <div className="progress-bar-inner">

        <div className="poor">
            <h6 >Poor</h6>
            </div> 

        <div className="average" >
            <h6>Average</h6>
            </div> 

        <div className="good" >
            <h6>Good</h6>
            </div> 

        <div className="best"  >
        <h6>Best</h6>
        </div>

      </div>
    </div>
  );
};

export default ProgressBar;