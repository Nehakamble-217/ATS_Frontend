import React from 'react';
import { RWebShare } from "react-web-share";


const ShareLink = ({toggleResumeLink}) => {
  return (
    <div>
     <RWebShare
        data={{
          
          url: `http://localhost:5173/shareResumeLink`
         
        }}
        onClick={() => alert("shared successfully!")}
      >
        <button>Share 🔗</button>
      </RWebShare>
     <button onClick={toggleResumeLink}>View</button>
    
    </div>
  )
}

export default ShareLink