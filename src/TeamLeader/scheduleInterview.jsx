import React, { useState } from 'react';
import "./scheduleInterview.css";

function ScheduleInterview() {
  const [meetingLink, setMeetingLink] = useState(null);

  const createNewMeeting = () => {
    const newLink = `https://meet.google.com/${Math.random().toString(36).substr(2, 10)}`;
    setMeetingLink(newLink);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    alert('Meeting link copied to clipboard');
  };

  const dismissMeeting = () => {
    setMeetingLink(null);
  };

  return (
    <div>
      <div className='interviewbox'>
        <div className='interviewboxs microsoft'>
          <h1>Microsoft Teams</h1>
          <button className="microsoft-button">Create new meeting</button>
          <button className="microsoft-button">Schedule in Google Calendar</button>
          <button className="microsoft-button">Create a Group</button>
        </div>
        <div className='interviewboxs google'>
          <h1>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Meet_icon_%282020%29.svg" alt="Google Meet Logo" className="google-logo" />
            Google Meet
          </h1>
          <button className="google-button" onClick={createNewMeeting}>Create new meeting</button>
          {meetingLink && (
            <div className="meeting-options">
              <p>Meeting Link: {meetingLink}</p>
              <button className="google-button" onClick={copyToClipboard}>Copy Link</button>
              <button className="google-button">Share</button>
              <button className="google-button">Join</button>
              <button className="google-button" onClick={dismissMeeting}>Dismiss</button>
            </div>
          )}
        </div>
        <div className='interviewboxs skype'>
          <h1>Skype</h1>
        </div>
        <div className='interviewboxs bluejeans'>
          <h1>BlueJeans</h1>
        </div>
      </div>
      <div className='interviewbox'>
        <div className='interviewboxs zoom'>
          <h1>Zoom</h1>
        </div>
        <div className='interviewboxs cisco'>
          <h1>Cisco Webex</h1>
        </div>
        <div className='interviewboxs doodle'>
          <h1>Doodle</h1>
        </div>
        <div className='interviewboxs create'>
          <h1>Create Own Meeting</h1>
        </div>
      </div>
    </div>
  );
}

export default ScheduleInterview;
