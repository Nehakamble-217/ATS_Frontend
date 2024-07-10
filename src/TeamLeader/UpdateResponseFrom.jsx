import React, { useEffect, useState } from "react";
import Sidebar from "../EmployeeDashboard/sideBar";

const UpdateResponseFrom = ({ candidateId, employeeId, requirementId, onClose,onSuccessAdd }) => {
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  // const [count,setCount] = useState(0);
  const [formData, setFormData] = useState({
    interviewRound: "",
    interviewResponse: "",
    commentForTl: "",
    responseUpdatedDate: "",
    nextInterviewDate: "",
    nextInterviewTiming: "",
    callingTracker: { candidateId: candidateId },
    requirementInfo: { requirementId: requirementId },
    employee: { employeeId: employeeId },
  });

  useEffect(() => {
    fetchDataToUpdate();
  }, []);

  const fetchDataToUpdate = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.48:8891/api/ats/157industries/fetch-specific-response/${candidateId}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);

      // Populate form data with the first response by default (assuming it's an array)
      if (responseData.length > 0) {
        const initialResponse = responseData[responseData.length - 1]; // Assuming data is an array of responses
        setFormData((prevFormData) => ({
          ...prevFormData,
          interviewRound: initialResponse.interviewRound || "",
          interviewResponse: initialResponse.interviewResponse || "",
          commentForTl: initialResponse.commentForTl || "",
          responseUpdatedDate: initialResponse.responseUpdatedDate || "",
          nextInterviewDate: initialResponse.nextInterviewDate || "",
          nextInterviewTiming: initialResponse.nextInterviewTiming || "",
        }));
      }
    } catch (err) {
      console.log("Error fetching UpdateResponse data:", err);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedData = [...data];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      setData(updatedData);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save new interview response
      const response = await fetch(
        "http://192.168.1.48:8891/api/ats/157industries/save-interview-response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Form data saved successfully");
        setSuccessMessage("Response updated successfully.");
        onSuccessAdd(true);
        // Optionally, handle any UI updates or notifications here
      } else {
        console.log("Failed to save form data");
        onSuccessAdd(false);
      }
    } catch (err) {
      console.error("Error saving form data:", err);
    }
  };

  return (
    // SwapnilRokade_UpdateResponseForm_Adding_Notification_Functionality_smallChanges_09/07"

    <div className="p-6 bg-white shadow-md rounded-lg max-w-full">
    <div className="mb-4">
      <h6 className="text-lg font-semibold">Response Update</h6>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-[#ffcb9b] text-gray-500">
            <tr>
              <th className="p-2 font-semibold text-xs sm:text-base">No</th>
              <th className="p-2 font-semibold text-xs sm:text-base">Interview Round</th>
              <th className="p-2 font-semibold text-xs sm:text-base">Interview Response</th>
              <th className="p-2 font-semibold text-xs sm:text-base">Comment for TL</th>
              <th className="p-2 font-semibold text-xs sm:text-base">Update Date</th>
              <th className="p-2 font-semibold text-xs sm:text-base">Next Interview Date</th>
              <th className="p-2 font-semibold text-xs sm:text-base">Interview Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((response, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 text-xs sm:text-base">{index + 1}</td>
                <td className="p-2">
                  <select
                    className="form-select w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                    name="interviewRound"
                    value={response.interviewRound}
                    onChange={(e) => handleInputChange(e, index)}

                  >
                    <option value="">Select Interview</option>
                    <option value="Shortlisted For Hr Round">Hr Round</option>
                    <option value="Shortlisted For Technical Round">Technical Round</option>
                    <option value="L1 Round">L1 Round</option>
                    <option value="L2 Round">L2 Round</option>
                    <option value="L3 Round">L3 Round</option>
                  </select>
                </td>
                <td className="p-2">
                  <select
                    className="form-select w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                    name="interviewResponse"
                    value={response.interviewResponse}
                    onChange={(e) => handleInputChange(e, index)}
                  >
                    <option value="">Update Response</option>
                    <option value="Shortlisted For Hr Round">Shortlisted For Hr Round</option>
                    <option value="Shortlisted For Technical Round">Shortlisted For Technical Round</option>
                    <option value="Shortlisted For L1 Round">Shortlisted For L1 Round</option>
                    <option value="Shortlisted For L2 Round">Shortlisted For L2 Round</option>
                    <option value="Shortlisted For L3 Round">Shortlisted For L3 Round</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Result Pending">Hold</option>
                    <option value="No Show">No Show</option>
                  </select>
                </td>
                <td className="p-2">
                  <input
                    className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                    type="text"
                    name="commentForTl"
                    value={response.commentForTl}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Enter Comment here..."
                  />
                </td>
                <td className="p-2">
                  <input
                    className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                    type="date"
                    name="responseUpdatedDate"
                    value={response.responseUpdatedDate}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </td>
                <td className="p-2">
                  <input
                    className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                    type="date"
                    name="nextInterviewDate"
                    value={response.nextInterviewDate}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </td>
                <td className="p-2">
                  <input
                    className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                    type="time"
                    name="nextInterviewTiming"
                    value={response.nextInterviewTiming}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </td>
              </tr>
            ))}
            <tr className="border-b">
              <td className="p-2 text-xs sm:text-base"></td>
              <td className="p-2">
                <select
                  className="form-select w-full px-4 py-1.5 border rounded text-xs sm:text-base"
                  name="interviewRound"
                  value={formData.interviewRound}
                  onChange={(e) => handleInputChange(e)}
                  required
                >
                  <option value="">Select Interview</option>
                    <option value="Shortlisted For Hr Round">Hr Round</option>
                    <option value="Shortlisted For Technical Round">Technical Round</option>
                    <option value="L1 Round">L1 Round</option>
                    <option value="L2 Round">L2 Round</option>
                    <option value="L3 Round">L3 Round</option>
                </select>
              </td>
              <td className="p-2">
                <select
                  className="form-select w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                  name="interviewResponse"
                  value={formData.interviewResponse}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Update Response</option>
                  <option value="Shortlisted For Hr Round">Shortlisted For Hr Round</option>
                  <option value="Shortlisted For Technical Round">Shortlisted For Technical Round</option>
                  <option value="Shortlisted For L1 Round">Shortlisted For L1 Round</option>
                  <option value="Shortlisted For L2 Round">Shortlisted For L2 Round</option>
                  <option value="Shortlisted For L3 Round">Shortlisted For L3 Round</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Result Pending">Hold</option>
                  <option value="No Show">No Show</option>
                </select>
              </td>
              <td className="p-2">
                <input
                  className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                  type="text"
                  name="commentForTl"
                  value={formData.commentForTl}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Enter Comment here..."
                />
              </td>
              <td className="p-2">
                <input
                  className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                  type="date"
                  name="responseUpdatedDate"
                  value={formData.responseUpdatedDate}
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td className="p-2">
                <input
                  className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                  type="date"
                  name="nextInterviewDate"
                  value={formData.nextInterviewDate}
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td className="p-2">
                <input
                  className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                  type="time"
                  name="nextInterviewTiming"
                  value={formData.nextInterviewTiming}
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {successMessage && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-700 rounded">
          {successMessage}
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button className="lineUp-share-btn" type="submit">
          Update
        </button>
        <button className="lineUp-share-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </form>
    {!handleSubmit&&<>
    <Sidebar count={count}/>
    </>}
  </div>
  );
};

export default UpdateResponseFrom;
