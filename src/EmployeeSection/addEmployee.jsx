import React, { useState } from "react";
import "../EmployeeSection/addEmployee.css";
import { useForm } from "react-hook-form";

const AddEmployee = () => {
  const formData = useState({
    employeeName: "",
    dateOfJoining: "",
    designation: "",
    department: "",
    officialMail: "",
    employeeEmail: "",
    employeeNumber: "",
    officialContactNumber: "",
    alternateContactNo: "",
    dateOfBirth: "",
    gender: "",
    companyMobileNumber: "",
    whatsAppNumber: "",
    emergencyContactPerson: "",
    emergencyContactNumber: "",
    emergencyPersonRelation: "",
    employeePresentAddress: "",
    employeeExperience: "",
    perks: "",
    maritalStatus: "",
    anniversaryDate: "",
    tshirtSize: "",
    lastCompany: "",
    workLocation: "",
    entrySource: "",
    employeeStatus: "",
    lastWorkingDate: "",
    reasonForLeaving: "",
    inductionYesOrNo: "",
    inductionComment: "",
    trainingSource: "",
    trainingCompletedYesOrNo: "",
    trainingTakenCount: "",
    roundsOfInterview: "",
    interviewTakenPerson: "",
    warningComments: "",
    performanceIndicator: "",
    teamLeaderMsg: "",
    editDeleteAuthority: "",
    linkedInURl: "",
    faceBookURL: "",
    twitterURl: "",
    employeeAddress: "",
    bloodGroup: "",
    aadhaarNo: "",
    panNo: "",
    educationalQualification: "",
    offeredSalary: "",
    jobRole: "",
    professionalPtNo: "",
    esIcNo: "",
    pfNo: "",
    employeePassword: "",
    confirmPassword: "",
    profileImage: null,
    document: null,
    resumeFile: null,
    insuranceNumber: "",
    reportingMangerName: "",
    reportingMangerDesignation: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: formData });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // const [errors, setErrors] = useState({});
  const trainingCompleted = formData.trainingCompletedYesOrNo || "";

  const onSubmit = async (data) => {
    if (trainingCompleted === "Yes") {
      const validationResult = await trigger([
        "trainingSource",
        "trainingTakenCount",
      ]);
      if (!validationResult) {
        setShowErrors(true);
        return;
      }
    }

    const formDataToSend = new FormData();
    for (const key in data) {
      if (data[key] instanceof File) {
        formDataToSend.append(key, data[key]);
      } else {
        formDataToSend.append(key, data[key]);
      }
    }
    try {
      const response = await fetch(
        "http://192.168.1.46:9090/api/ats/157industries/add-employee",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (response.ok) {
        reset(formData);
        setSuccessMessage("Employee Data Added Successfully.");
      } else {
        setSuccessMessage("Failed to add employee data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Error occurred while adding employee data.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="form-container">
      <form
        className="form-group"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="form-row">
          <label>Employee Name:</label>
          <input
            type="text"
            name="employeeName"
            className="employee-inputs"
            placeholder="Enter Employee Full Name"
            {...register("employeeName", {
              required: "Employee name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.employeeName && (
            <div className="error">{errors.employeeName?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            {...register("dateOfJoining", {
              required: "Date of Joining is required",
            })}
          />
          {errors.employeeName && (
            <div className="error">{errors.dateOfJoining?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            placeholder="Eg: FrontEnd Developer"
            {...register("designation", {
              required: "Designation is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.designation && (
            <div className="error">{errors.designation?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            placeholder="Enter Department"
            {...register("department", {
              required: "Department is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.department && (
            <div className="error">{errors.department?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Job Role:</label>
          <select
            name="jobRole"
            {...register("jobRole", {
              required: "Job Role is required",
            })}
          >
            <option value="">Select Job Role</option>
            <option value="Team Leader">Team Leader</option>
            <option value="Admin">Admin</option>
            <option value="Senior Recruiter">Senior Recruiter</option>
            <option value="Recruiter">recruiter</option>
          </select>
          {errors.jobRole && (
            <div className="error">{errors.jobRole?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Official Email:</label>
          <input
            type="email"
            name="officialMail"
            placeholder="Enter Official Email"
            {...register("officialMail", {
              required: "Official Mail is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.officialMail && (
            <div className="error">{errors.officialMail?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Personal Email:</label>
          <input
            type="email"
            name="employeeEmail"
            placeholder="Enter Employee Email"
            {...register("employeeEmail", {
              required: "Employee Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.employeeEmail && (
            <div className="error">{errors.employeeEmail?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Mobile Number:</label>
          <input
            type="text"
            name="employeeNumber"
            placeholder="Enter Mobile Number"
            {...register("employeeNumber", {
              required: "Employee Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.employeeNumber && (
            <div className="error">{errors.employeeNumber?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Alternate Mobile Number:</label>
          <input
            type="text"
            accept="0-9"
            name="alternateContactNo"
            placeholder="Enter Alternate Mobile Number"
            {...register("alternateContactNo", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.alternateContactNo && (
            <div className="error">{errors.alternateContactNo?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Official Contact Number:</label>
          <input
            type="text"
            accept="0-9"
            name="officialContactNumber"
            placeholder="Enter Company Mobile Number"
            {...register("officialContactNumber", {
              required: "Official Contact Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.officialContactNumber && (
            <div className="error">{errors.officialContactNumber?.message}</div>
          )}
        </div>
        <div className="form-row">
          <label>Company Mobile Number:</label>
          <input
            type="text"
            accept="0-9"
            name="companyMobileNumber"
            placeholder="Enter Company Mobile Number"
            {...register("companyMobileNumber", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.companyMobileNumber && (
            <div className="error">{errors.companyMobileNumber?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>WhatsApp Number:</label>
          <input
            type="text"
            accept="0-9"
            name="whatsAppNumber"
            placeholder="Enter WhatsApp Number"
            {...register("whatsAppNumber", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.whatsAppNumber && (
            <div className="error">{errors.whatsAppNumber?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
          />
          {errors.dateOfBirth && (
            <div className="error">{errors.dateOfBirth?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Gender:</label>
          <select
            name="gender"
            {...register("gender", { required: "Gender Required" })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <div className="error">{errors.gender?.message}</div>
          )}
        </div>
        <div className="form-row">
          <label>Marital Status:</label>
          <select name="maritalStatus" {...register("maritalStatus")}>
            <option value={""}>Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div className="form-row">
          <label>Anniversary Date:</label>
          <input
            type="date"
            name="anniversaryDate"
            {...register("anniversaryDate")}
          />
        </div>

        <div className="form-row">
          <label>Emergency Contact Person:</label>
          <input
            type="text"
            name="emergencyContactPerson"
            placeholder="Enter Emergency Contact Person Name"
            {...register("emergencyContactPerson", {
              required: "Emergency Contact Person is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.emergencyContactPerson && (
            <div className="error">
              {errors.emergencyContactPerson?.message}
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Emergency Contact Number:</label>
          <input
            type="text"
            name="emergencyContactNumber"
            placeholder="Enter Emergency Contact Number"
            {...register("emergencyContactNumber", {
              required: "Emergency Contact Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.emergencyContactNumber && (
            <div className="error">
              {errors.emergencyContactNumber?.message}
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Emergency Person Relation:</label>
          <input
            type="text"
            name="emergencyPersonRelation"
            placeholder="Enter Emergency Person Relation"
            {...register("emergencyPersonRelation", {
              required: "Emergency Person Relation is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.emergencyPersonRelation && (
            <div className="error">
              {errors.emergencyPersonRelation?.message}
            </div>
          )}
        </div>

        <div className="form-row">
          <label>T-shirt Size:</label>
          <select name="tshirtSize" {...register("tshirtSize")}>
            <option value={""}>Select T-Shirt Size</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="3XL">3XL</option>
            <option value="4XL">4XL</option>
            <option value="5XL">5XL</option>
            <option value="6XL">6XL</option>
            <option value="7XL">7XL</option>
          </select>
        </div>

        <div className="form-row">
          <label>Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            placeholder="Enter Blood Group"
            {...register("bloodGroup")}
          />
        </div>
        <div className="form-row">
          <label>Aadhaar Number:</label>
          <input
            type="text"
            name="aadhaarNo"
            placeholder="Enter Aadhaar Number"
            {...register("aadhaarNo", {
              required: "Adhaar Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.aadhaarNo && (
            <div className="error">{errors.aadhaarNo?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>PAN Number:</label>
          <input
            type="text"
            name="panNo"
            placeholder="Enter PAN Number"
            {...register("panNo")}
          />
        </div>

        <div className="form-row">
          <label>Educational Qualification:</label>
          <input
            type="text"
            name="educationalQualification"
            placeholder="Enter Educational Qualification"
            {...register("educationalQualification", {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.educationalQualification && (
            <div className="error">
              {errors.educationalQualification?.message}
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Offered Salary:</label>
          <input
            type="text"
            name="offeredSalary"
            placeholder="Enter Offered Salary"
            {...register("offeredSalary", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.offeredSalary && (
            <div className="error">{errors.offeredSalary?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Upload Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            {...register("profileImage", {
              required: "Profile photo is required",
              validate: {
                checkFileType: (value) =>
                  value[0] &&
                  ["image/jpeg", "image/png", "image/jpg"].includes(
                    value[0].type
                  )
                    ? true
                    : "Only JPEG, JPG, and PNG files are allowed",
              },
            })}
          />
          {errors.profileImage && (
            <div className="error">{errors.profileImage?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Upload Document:</label>
          <input
            type="file"
            name="document"
            {...register("document", {
              required: "Document is required",
              validate: {
                checkFileType: (value) =>
                  value[0] && value[0].type === "application/pdf"
                    ? true
                    : "Only PDF files are allowed",
              },
            })}
          />
          {errors.document && (
            <div className="error">{errors.document?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Upload Resume:</label>
          <input
            type="file"
            name="resumeFile"
            {...register("resumeFile", {
              required: "Resume is required",
              validate: {
                checkFileType: (value) =>
                  value[0] && value[0].type === "application/pdf"
                    ? true
                    : "Only PDF files are allowed",
              },
            })}
          />
          {errors.resumeFile && (
            <div className="error">{errors.resumeFile?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Employee Present Address:</label>
          <input
            type="text"
            name="employeePresentAddress"
            placeholder="Enter Present Address"
            {...register("employeePresentAddress", {
              required: "Employee Present Address is required",
            })}
          />
          {errors.employeePresentAddress && (
            <div className="error">
              {errors.employeePresentAddress?.message}
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Employee Experience:</label>
          <input
            type="text"
            name="employeeExperience"
            placeholder="Enter Experience"
            {...register("employeeExperience", {
              required: "Employee Experience is required",
            })}
          />
          {errors.employeeExperience && (
            <div className="error">{errors.employeeExperience?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Perks:</label>
          <input
            type="text"
            name="perks"
            placeholder="Enter Perks"
            {...register("perks", {
              required: "Perks are required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.perks && <div className="error">{errors.perks?.message}</div>}
        </div>

        <div className="form-row">
          <label>Last Company:</label>
          <input
            type="text"
            name="lastCompany"
            placeholder="Enter Last Company"
            {...register("lastCompany")}
          />
        </div>

        <div className="form-row">
          <label>Work Location:</label>
          <input
            type="text"
            name="workLocation"
            placeholder="Enter Work Location"
            {...register("workLocation", {
              required: "Work Location",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.workLocation && (
            <div className="error">{errors.workLocation?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Entry Source:</label>
          <input
            type="text"
            name="entrySource"
            placeholder="Enter Entry Source"
            {...register("entrySource", {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.entrySource && (
            <div className="error">{errors.entrySource?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Employee Status:</label>
          <select
            name="employeeStatus"
            {...register("employeeStatus", {
              required: "Employee Status is required",
            })}
          >
            <option value={""}>Select Employee Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.employeeStatus && (
            <div className="error">{errors.employeeStatus?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Last Working Date:</label>
          <input
            type="date"
            name="lastWorkingDate"
            {...register("lastWorkingDate")}
          />
        </div>

        <div className="form-row">
          <label>Reason for Leaving:</label>
          <input
            type="text"
            name="reasonForLeaving"
            placeholder="Enter Reason for Leaving"
            {...register("reasonForLeaving", {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.reasonForLeaving && (
            <div className="error">{errors.reasonForLeaving?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Induction (Yes/No):</label>
          <select
            name="inductionYesOrNo"
            {...register("inductionYesOrNo", {
              required: "Induction status is required",
            })}
          >
            <option value={""}>Select Yes or No</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.inductionYesOrNo && (
            <div className="error">{errors.inductionYesOrNo?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Induction Comment:</label>
          <input
            type="text"
            name="inductionComment"
            placeholder="Enter Induction Comment"
            {...register("inductionComment", {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.inductionComment && (
            <div className="error">{errors.inductionComment?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Training Source:</label>
          <input
            type="text"
            name="trainingSource"
            placeholder="Enter Training Source"
            {...register("trainingSource", {
              validate: (value) =>
                trainingCompleted === "Yes"
                  ? value
                    ? true
                    : "Tranining Source required"
                  : true,
            })}
          />
          {errors.trainingSource && (
            <div className="error">{errors.trainingSource?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Training Completed (Yes/No):</label>
          <select
            name="trainingCompletedYesOrNo"
            {...register("trainingCompletedYesOrNo", {
              required: "Training completion status is required",
            })}
          >
            <option value={""}>Select Yes or No</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.trainingCompletedYesOrNo && (
            <div className="error">
              {errors.trainingCompletedYesOrNo?.message}
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Training Taken Count:</label>
          <input
            type="number"
            name="trainingTakenCount"
            placeholder="Enter Training Taken Count"
            {...register("trainingTakenCount", {
              validate: (value) =>
                trainingCompleted === "Yes"
                  ? value
                    ? true
                    : "Training Count is required"
                  : true,
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
              min: {
                value: 0,
                message: "Negative values are not allowed",
              },
            })}
          />
          {errors.trainingTakenCount && (
            <div className="error">{errors.trainingTakenCount?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Rounds of Interview:</label>
          <input
            type="text"
            name="roundsOfInterview"
            placeholder="Enter Rounds of Interview"
            {...register("roundsOfInterview", {
              required: "Count Of Interview is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.roundsOfInterview && (
            <div className="error">{errors.roundsOfInterview?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Interview Taken By:</label>
          <input
            type="text"
            name="interviewTakenPerson"
            placeholder="Enter Interview Taken By"
            {...register("interviewTakenPerson", {
              required: "Interview Taken Name Required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.interviewTakenPerson && (
            <div className="error">{errors.interviewTakenPerson?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Warning Comments:</label>
          <input
            type="text"
            name="warningComments"
            placeholder="Enter Warning Comments"
            {...register("warningComments", {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.warningComments && (
            <div className="error">{errors.warningComments?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Performance Indicator:</label>
          <input
            type="text"
            name="performanceIndicator"
            placeholder="Enter Performance Indicator"
            {...register("performanceIndicator", {
              required: "Performance are required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.performanceIndicator && (
            <div className="error">{errors.performanceIndicator?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Team Leader Message:</label>
          <input
            type="text"
            name="teamLeaderMsg"
            placeholder="Enter Team Leader Message"
            {...register("teamLeaderMsg", {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.teamLeaderMsg && (
            <div className="error">{errors.teamLeaderMsg?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Edit/Delete Authority:</label>
          <input
            type="text"
            name="editDeleteAuthority"
            placeholder="Enter Edit/Delete Authority"
            {...register("editDeleteAuthority", {
              required: "Authority Required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.editDeleteAuthority && (
            <div className="error">{errors.editDeleteAuthority?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>LinkedIn URL:</label>
          <input
            type="text"
            name="linkedInURl"
            placeholder="Enter LinkedIn URL"
            {...register("linkedInURl", {
              required: "Linkdln Url Required",
            })}
          />
          {errors.linkedInURl && (
            <div className="error">{errors.linkedInURl?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Facebook URL:</label>
          <input
            type="text"
            name="faceBookURL"
            placeholder="Enter Facebook URL"
            {...register("faceBookURL")}
          />
        </div>

        <div className="form-row">
          <label>Twitter URL:</label>
          <input
            type="text"
            name="twitterURl"
            placeholder="Enter Twitter URL"
            {...register("twitterURl")}
          />
        </div>

        <div className="form-row">
          <label>Employee Address:</label>
          <input
            type="text"
            name="employeeAddress"
            placeholder="Enter Employee Address"
            {...register("employeeAddress")}
          />
        </div>

        <div className="form-row">
          <label>Professional PT Number:</label>
          <input
            type="text"
            name="professionalPtNo"
            placeholder="Enter Professional PT Number"
            {...register("professionalPtNo", {
              required: "Professional PT Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.professionalPtNo && (
            <div className="error">{errors.professionalPtNo?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>ESIC Number:</label>
          <input
            type="text"
            name="esIcNo"
            placeholder="Enter ESIC Number"
            {...register("esIcNo", {
              required: "ESIC Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.esIcNo && (
            <div className="error">{errors.esIcNo?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>PF Number:</label>
          <input
            type="text"
            name="pfNo"
            placeholder="Enter PF Number"
            {...register("pfNo", {
              required: "PF Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.pfNo && <div className="error">{errors.pfNo?.message}</div>}
        </div>

        <div className="form-row">
          <label>Insurance Number:</label>
          <input
            type="text"
            name="insuranceNumber"
            placeholder="Enter Insurance Number"
            {...register("insuranceNumber", {
              required: "Insurance Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numeric value only",
              },
            })}
          />
          {errors.insuranceNumber && (
            <div className="error">{errors.insuranceNumber?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Reporting Manager Name:</label>
          <input
            type="text"
            name="reportingMangerName"
            placeholder="Enter Reporting Manager Name"
            {...register("reportingMangerName", {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.reportingMangerName && (
            <div className="error">{errors.reportingMangerName?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Reporting Manager Designation:</label>
          <input
            type="text"
            name="reportingMangerDesignation"
            placeholder="Enter Reporting Manager Designation"
            {...register("reportingMangerDesignation", {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter character value only",
              },
            })}
          />
          {errors.reportingMangerDesignation && (
            <div className="error">
              {errors.reportingMangerDesignation?.message}
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Password:</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="employeePassword"
              placeholder="Enter Password"
              {...register("employeePassword", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="show-pass-btn"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
          {errors.employeePassword && (
            <div className="error">{errors.employeePassword?.message}</div>
          )}
        </div>

        <div className="form-row">
          <label>Confirm Password:</label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("employeePassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword?.message}</div>
          )}
        </div>

        <div className="add-employee-submit-div">
          <button type="submit" className="submit-button-add-emp">
            Submit
          </button>
        </div>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>
    </div>
  );
};

export default AddEmployee;
