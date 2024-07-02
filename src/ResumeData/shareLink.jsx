import React from 'react';
import { RWebShare } from "react-web-share";


const ShareLink = ({toggleResumeLink}) => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
     <RWebShare
        data={{
          
          url: `http://192.168.1.42:5173/shareResumeLink`
         
        }}
        onClick={() => alert("shared successfully!")}
       
      >
        <button className='daily-tr-btn'>Share 🔗</button>
      </RWebShare>
     <button  className='daily-tr-btn' onClick={toggleResumeLink}>View</button>
    
    </div>
  )
}

export default ShareLink