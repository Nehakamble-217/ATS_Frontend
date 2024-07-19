import React, { useState } from 'react';
import './scheduleInterview.css';

function ScheduleInterview() {
  const [meetingLink, setMeetingLink] = useState(null);

  const platforms = [
    { name: 'Microsoft Teams', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', color: '#0078d4' },
    { name: 'Google Meet', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Meet_icon_%282020%29.svg', color: '#34a853' },
    { name: 'Skype', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Skype_logo_%282019%29.svg', color: '#00aff0' },
    { name: 'BlueJeans', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/BlueJeans_Logo.png', color: '#0072c6' },
    { name: 'Zoom', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Zoom_Communications_Logo.svg', color: '#2d8cff' },
    { name: 'Cisco Webex', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Cisco_Webex_Meetings_Logo.png', color: '#0075ff' },
    { name: 'Doodle', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Doodle_logo.svg', color: '#f28c38' },
    { name: 'GoToMeeting', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/LogMeIn_GoToMeeting_Logo.png', color: '#ff7f00' },
    { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png', color: '#4a154b' },
    { name: 'Jitsi Meet', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Jitsi-logo.png', color: '#0d47a1' },
  ];

  const createNewMeeting = (platform) => {
    const newLink = `https://${platform.toLowerCase().replace(/\s+/g, '')}.com/${Math.random().toString(36).substr(2, 10)}`;
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
        {platforms.map((platform, index) => (
          <div key={index} className='interviewboxs' style={{ borderColor: platform.color }}>
            <h1>
              <img src={platform.logo} alt={`${platform.name} Logo`} className="platform-logo" />
              {platform.name}
            </h1>
            <button className="platform-button" style={{ backgroundColor: platform.color }} onClick={() => createNewMeeting(platform.name)}>
              Create new meeting
            </button>
          </div>
        ))}
      </div>
      {meetingLink && (
        <div className="meeting-options">
          <p>Meeting Link: {meetingLink}</p>
          <button className="platform-button" onClick={copyToClipboard}>Copy Link</button>
          <button className="platform-button">Share</button>
          <button className="platform-button">Join</button>
          <button className="platform-button" onClick={dismissMeeting}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default ScheduleInterview;
