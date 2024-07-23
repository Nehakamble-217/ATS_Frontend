
import React from "react";
import { RWebShare } from "react-web-share";
import "../ResumeData/shareLink.css"

const ShareLink = ({ toggleResumeLink }) => {
  // Get the current hostname and port
  const hostname = window.location.hostname;
  const port = window.location.port;
  const protocol = window.location.protocol;

  // Construct the URL dynamically
  const shareURL = `${protocol}//${hostname}:${port}/shareResumeLink`;

  return (
    <div className="shareLink-mainDiv"
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "space-around",
      // }}
    >
      <RWebShare
        data={{
          url: `http://192.168.1.48:5173/shareResumeLink`,
        }}
        onClick={() => alert("Shared successfully!")}
      >
      <div className="shareLink-share-btn-Div">
        <h1>Share Link To Candidate</h1>
        <button className="shareLink-share-btn">Share 🔗</button>
        </div>
      </RWebShare>
      <div className="shareLink-view-btn-Div">
        <h1>Create Resume</h1>
      <button className="shareLink-view-btn" onClick={toggleResumeLink}>
      Create
      </button>
      </div>
    </div>
  );
};

export default ShareLink;
