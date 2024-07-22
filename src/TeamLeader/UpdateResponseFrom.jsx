import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const UpdateResponseForm = ({ candidateId, onClose }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchDataToUpdate();
  }, []);

  const fetchDataToUpdate = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.46:9090/api/ats/157industries/fetch-specific-response/${candidateId}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);

      // Populate form data with the first response by default (assuming it's an array)
      if (responseData.length > 0) {
        const initialResponse = responseData[responseData.length - 1]; // Assuming data is an array of responses
        // Set initial values for form fields
        setValue("interviewRound", initialResponse.interviewRound || "");
        setValue("interviewResponse", initialResponse.interviewResponse || "");
        setValue("commentForTl", initialResponse.commentForTl || "");
        setValue(
          "responseUpdatedDate",
          initialResponse.responseUpdatedDate || ""
        );
        setValue("nextInterviewDate", initialResponse.nextInterviewDate || "");
        setValue(
          "nextInterviewTiming",
          initialResponse.nextInterviewTiming || ""
        );
      }
    } catch (err) {
      console.log("Error fetching UpdateResponse data:", err);
    }
  };

  const onSubmit = async (formData) => {
    try {
      // Save new interview response
      const response = await fetch(
        "http://192.168.1.46:9090/api/ats/157industries/save-interview-response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            callingTracker: { candidateId: candidateId },
            requirementInfo: { requirementId: 20 },
            employee: { employeeId: 16 },
          }),
        }
      );

      if (response.ok) {
        console.log("Form data saved successfully");
        setSuccessMessage("Response updated successfully.");
        // Optionally, handle any UI updates or notifications here
      } else {
        console.log("Failed to save form data");
      }
    } catch (err) {
      console.error("Error saving form data:", err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-full">
      <div className="mb-4">
        <h6 className="text-lg font-semibold">Response Update</h6>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-[#ffcb9b] text-gray-500">
              <tr>
                <th className="p-2 font-semibold text-xs sm:text-base">No</th>
                <th className="p-2 font-semibold text-xs sm:text-base">
                  Interview Round
                </th>
                <th className="p-2 font-semibold text-xs sm:text-base">
                  Interview Response
                </th>
                <th className="p-2 font-semibold text-xs sm:text-base">
                  Comment for TL
                </th>
                <th className="p-2 font-semibold text-xs sm:text-base">
                  Update Date
                </th>
                <th className="p-2 font-semibold text-xs sm:text-base">
                  Next Interview Date
                </th>
                <th className="p-2 font-semibold text-xs sm:text-base">
                  Interview Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((response, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-xs sm:text-base">{index + 1}</td>
                  <td className="p-2">
                    <Controller
                      control={control}
                      name={`responses[${index}].interviewRound`}
                      rules={{ required: "Interview round is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="form-select w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                        >
                          <option value="">Select Interview</option>
                          <option value="Shortlisted For Hr Round">
                            Hr Round
                          </option>
                          <option value="Shortlisted For Technical Round">
                            Technical Round
                          </option>
                          <option value="L1 Round">L1 Round</option>
                          <option value="L2 Round">L2 Round</option>
                          <option value="L3 Round">L3 Round</option>
                        </select>
                      )}
                    />
                    {errors.responses?.[index]?.interviewRound && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.responses[index].interviewRound.message}
                      </p>
                    )}
                  </td>
                  <td className="p-2">
                    <Controller
                      control={control}
                      name={`responses[${index}].interviewResponse`}
                      rules={{ required: "Interview response is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="form-select w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                        >
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
                          <option value="No Show">No Show</option>
                        </select>
                      )}
                    />
                    {errors.responses?.[index]?.interviewResponse && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.responses[index].interviewResponse.message}
                      </p>
                    )}
                  </td>
                  <td className="p-2">
                    <Controller
                      control={control}
                      name={`responses[${index}].commentForTl`}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                          type="text"
                          placeholder="Enter Comment here..."
                        />
                      )}
                    />
                  </td>
                  <td className="p-2">
                    <Controller
                      control={control}
                      name={`responses[${index}].responseUpdatedDate`}
                      rules={{ required: "Update date is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                          type="date"
                        />
                      )}
                    />
                    {errors.responses?.[index]?.responseUpdatedDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.responses[index].responseUpdatedDate.message}
                      </p>
                    )}
                  </td>
                  <td className="p-2">
                    <Controller
                      control={control}
                      name={`responses[${index}].nextInterviewDate`}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                          type="date"
                        />
                      )}
                    />
                  </td>
                  <td className="p-2">
                    <Controller
                      control={control}
                      name={`responses[${index}].nextInterviewTiming`}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                          type="time"
                        />
                      )}
                    />
                  </td>
                </tr>
              ))}
              <tr className="border-b">
                <td className="p-2 text-xs sm:text-base"></td>
                <td className="p-2">
                  <Controller
                    control={control}
                    name="interviewRound"
                    rules={{ required: "Interview round is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="form-select w-full px-4 py-1.5 border rounded text-xs sm:text-base"
                      >
                        <option value="">Select Interview</option>
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
                      </select>
                    )}
                  />
                  {errors.interviewRound && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.interviewRound.message}
                    </p>
                  )}
                </td>
                <td className="p-2">
                  <Controller
                    control={control}
                    name="interviewResponse"
                    rules={{ required: "Interview response is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="form-select w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                      >
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
                        <option value="No Show">No Show</option>
                      </select>
                    )}
                  />
                  {errors.interviewResponse && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.interviewResponse.message}
                    </p>
                  )}
                </td>
                <td className="p-2">
                  <Controller
                    control={control}
                    name="commentForTl"
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                        type="text"
                        placeholder="Enter Comment here..."
                      />
                    )}
                  />
                </td>
                <td className="p-2">
                  <Controller
                    control={control}
                    name="responseUpdatedDate"
                    rules={{ required: "Update date is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                        type="date"
                      />
                    )}
                  />
                  {errors.responseUpdatedDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.responseUpdatedDate.message}
                    </p>
                  )}
                </td>
                <td className="p-2">
                  <Controller
                    control={control}
                    name="nextInterviewDate"
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                        type="date"
                      />
                    )}
                  />
                </td>
                <td className="p-2">
                  <Controller
                    control={control}
                    name="nextInterviewTiming"
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full px-3 py-1.5 border rounded text-xs sm:text-base"
                        type="time"
                      />
                    )}
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
    </div>
  );
};

export default UpdateResponseForm;
