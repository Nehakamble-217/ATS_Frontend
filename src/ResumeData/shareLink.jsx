// import React from 'react';
// import { RWebShare } from "react-web-share";

// const ShareLink = ({ toggleResumeLink }) => {
//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
//       <RWebShare
//         data={{

//           url: `http://192.168.1.38:5173/shareResumeLink`
//         }}
//         onClick={() => alert("shared successfully!")}

//       >
//         <button className='daily-tr-btn'>Share 🔗</button>
//       </RWebShare>
//       <button className='daily-tr-btn' onClick={toggleResumeLink}>View</button>

//     </div>
//   )
// }

// export default ShareLink

import React from "react";
import { RWebShare } from "react-web-share";

const ShareLink = ({ toggleResumeLink }) => {
  // Get the current hostname and port
  const hostname = window.location.hostname;
  const port = window.location.port;
  const protocol = window.location.protocol;

  // Construct the URL dynamically
  const shareURL = `${protocol}//${hostname}:${port}/shareResumeLink`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <RWebShare
        data={{
          url: `http://192.168.1.48:5173/shareResumeLink`,
        }}
        onClick={() => alert("Shared successfully!")}
      >
        <button className="daily-tr-btn">Share 🔗</button>
      </RWebShare>
      <button className="daily-tr-btn" onClick={toggleResumeLink}>
        View
      </button>
    </div>
  );
};

export default ShareLink;
