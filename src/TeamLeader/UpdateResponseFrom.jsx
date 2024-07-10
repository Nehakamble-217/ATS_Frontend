/* SwapnilRokade_UpdateResponsePage_05/07 */

import React, { useEffect, useState } from 'react';


const UpdateResponseFrom = ({ candidateId, onClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataToUpdate();
  }, []);

  const fetchDataToUpdate = async () => {
    try {
      const response = await fetch(`http://192.168.1.48:8891/api/ats/157industries/fetch-specific-response/${candidateId}`);
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.log("Error fetching UpdateResponse data:", err);
    }
  };

  return (
    <div className="shortlist-table-div">
    <div className="interview-response-update">
      <h6>Response Update</h6>
    </div>
    <form>
      <table id="table-shortlisted" className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>No</th>
            <th>Interview Round</th>
            <th>Interview Response</th>
            <th>Comment for TL</th>
            <th>Update Date</th>            
            <th>Next Interview Date</th>
            <th>Interview Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((response, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{response.interviewRound}</td>
              <td>{response.interviewResponse}</td>
              <td>{response.commentForTl}</td>
              <td>{response.responseUpdatedDate}</td>
              <td>{response.nextInterviewDate}</td>
              <td>{response.nextInterviewTiming}</td>
            </tr>
          ))}
          <tr>
            <td></td>

            <td>
              <select name="interviewRound" required>
                <option value="">Select Interview</option>
                <option value="Hr Round">Hr Round</option>
                <option value="Technical Round">Technical Round</option>
                <option value="L1 Round"> L1 Round</option>
                <option value="L2 Round"> L2 Round</option>
                <option value="L3 Round"> L3 Round</option>
              </select>
            </td>
            <td>
              <select name="interviewResponse">
                <option value="">Update Response</option>
                <option value="Shortlisted For Hr Round">
                  Shortlisted For Hr Round
                </option>
                <option value="Shortlisted For Technical Round">
                  Shortlisted For Technical Round
                </option>
                <option value="Shortlisted For L1 Round">
                  Shortlisted For L1 Round
                </option>
                <option value="Shortlisted For L2 Round">
                  Shortlisted For L2 Round
                </option>
                <option value="Shortlisted For L3 Round">
                  Shortlisted For L3 Round
                </option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
                <option value="Result Pending">Hold</option>
                <option value="Result Pending">Result Pending</option>
                <option value="No Show">No Show</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter Comment here... "
                name=""
                id=""
              />
            </td>
            <td>
              <input type="date" name="responseUpdatedDate" />
            </td>
            <td>
              <input type="date" name="nextInterviewDate" />
            </td>
            <td>
              <input type="time" name="nextInterviewTiming" />
            </td>
          </tr>
        </tbody>
      </table>
      {/* {formSubmitted && (
        <div className="alert alert-success" role="alert">
          Interview Response Updated Successfully!
        </div>
      )} */}
      <div className="shortlisted-submite-btn">
        <button type="submit">Update</button>
        <button onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  </div>
  );
};

export default UpdateResponseFrom;
