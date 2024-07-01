import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import "../notPad/notePad.css";

const NotePad = () => {
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [notePadData, setNotePadData] = useState([]);
  const [editMessageId, setEditMessageId] = useState(null);
  const [error, setError] = useState(null);
  const [isOverflowing, setIsOverflowing] = useState(false); 
  
  useEffect(() => {
    fetchNotePadData();
  }, []);
  const { employeeId } = useParams();

  const Date1 = new Date().toISOString().slice(0,10);
  const time = new Date().toISOString().slice(11,16);
  const timeDate = Date1 + " " + time;

  const saveMessage = async (e) => {
    e.preventDefault();

    const noteData = {
      employeeId,
      message,
      timeDate
    };
    try {
      let url = editMessageId ? `http://192.168.1.39:8891/api/ats/157industries/updateNoteData/${editMessageId}` : 'http://192.168.1.39:8891/api/ats/157industries/notes';
      const response = await fetch(url, {
        method: editMessageId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
        setMessage(""); // Clear the textarea after saving
        fetchNotePadData(); // Fetch updated data after saving
        setEditMessageId(null); // Reset edit message ID after saving
      } else {
        throw new Error("Failed to save note");
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      setError("Failed to save note. Please try again later.");
    }
  };

  const fetchNotePadData = async () => {
    try {
      const response = await fetch('http://192.168.1.39:8891/api/ats/157industries/notesData');
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setNotePadData(data);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      console.error("Failed to fetch NotePad data:", error);
      setError("Failed to fetch NotePad data. Please try again later.");
    }
  };

  const updateMessage = async (messageId) => {
    try {
      const response = await fetch(`http://192.168.1.39:8891/api/ats/157industries/updateNoteData/${messageId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessage(data.message); // Populate the textarea with the message
      setEditMessageId(data.messageId); // Set the messageId for the edited note
      // Open the modal for editing
      document.getElementById('editModal').style.display = 'block';
    } catch (error) {
      console.error("Failed to fetch NotePad data:", error);
      setError("Failed to fetch NotePad data. Please try again later.");
    }
  };

  const deleteMessage = async (messageId) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
  if (!confirmed) return;

  try {
    const response = await fetch(`http://192.168.1.39:8891/api/ats/157industries/deleteNoteData/${messageId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Update notePadData by removing the deleted note
      setNotePadData(notePadData.filter(note => note.messageId !== messageId));
      // Show success message or perform any other action upon successful deletion
      console.log("Note deleted successfully");
    } else {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error("Failed to delete note:", error);
    // Show error message or perform any other action upon failed deletion
    setError("Failed to delete note. Please try again later.");
  }
};
  // To handle tooltip

  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector('.tooltip');
    const tooltiptext = tableData.querySelector('.tooltiptext');

    if (tooltip && tooltiptext) {
      const textOverflowing = tableData.offsetWidth < tableData.scrollWidth || tableData.offsetHeight < tableData.scrollHeight;
      if (textOverflowing) {
        const rect = tableData.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 100}px`;
        tooltip.style.visibility = 'visible';
      } else {
        tooltip.style.visibility = 'hidden';
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
    }
  };
  



  return (
    <div className='note-container'>
      <div className='note-pad-form'>
        <form className='note-form-div' onSubmit={saveMessage}>
         
         
          <textarea
            className='note-pad-text'
            placeholder='Enter your comment here.........'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            cols="30"
            rows="10"
          ></textarea>


          {successMessage && (
            <div className="notepad-alert-success" role="alert">
              Your Note Saved Successfully 😊!
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button className='note-submit-btn' type="submit">Save Comment</button>
        </form>
      </div>
      <div className='notePadData' >
        <div>
          {notePadData.length > 0 ? (
            <table className='notepad-table-data'>
              <thead className='table-heading-rows'>
                <tr className='table-heading-rows-data'>
                  <th>Sr.No</th>
                  <th >Message</th>
                  <th>Time & Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {notePadData.map((note, index) => (
                  <tr key={index}>
                    <td >{note.messageId}</td>
                    <td onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='tabledata' >{note.message}
                     <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="tooltip">
                    <span class="tooltiptext">{note.message}</span>
                    </div> 
                    

                    </td>
                    <td >{note.timeDate}</td>
                    <td><button  className='note-submit-btn'  onClick={() => updateMessage(note.messageId)}>Edit</button></td>
                    <td><button className='note-submit-btn' onClick={() => deleteMessage(note.messageId)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      </div>
      <div id="editModal" className="notepad-modal">
        <div className="notepad-modal-content">
          <span className="close" onClick={() => document.getElementById('editModal').style.display = 'none'}>&times;</span>
          <form onSubmit={saveMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              cols="200"
              rows="10"
            ></textarea>
            <button type="submit" className='note-submit-btn'>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotePad