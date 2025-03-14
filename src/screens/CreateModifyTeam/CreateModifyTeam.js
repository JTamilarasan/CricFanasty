import React, { useState } from "react";
import "./CreateModifyTeam.css";

const CreateModifyTeam = ({ leagueName }) => {
  const [teamName, setTeamName] = useState("");
  const [shortName, setShortName] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!teamName.trim()) errors.teamName = "Team Name is required";
    if (!shortName.trim()) errors.shortName = "Short Team Name is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", { leagueName, teamName, shortName });
      // Perform API call or further action here
    }
  };

  return (
    <div className="create-modify-team-container">
      <div className="create-modify-heading">Create Team / Modify Team</div>
      <form onSubmit={handleSubmit}>
        <div className="create-modify-form-group">
          <label className="create-modify-label">League Name:</label>
          <input type="text" value={leagueName} disabled className="create-modify-disabled-input" />
        </div>
        <div className="create-modify-form-group">
          <label className="create-modify-label">Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className={`create-modify-input ${errors.teamName ? "input-error" : ""}`}
          />
          {errors.teamName && <span className="create-modify-error-message">{errors.teamName}</span>}
        </div>
        <div className="create-modify-form-group">
          <label className="create-modify-label">Short Team Name:</label>
          <input
            type="text"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            className={`create-modify-input ${errors.shortName ? "input-error" : ""}`}
          />
          {errors.shortName && <span className="create-modify-error-message">{errors.shortName}</span>}
        </div>
        <div className="create-modify-button-container">
          <button type="submit" className="create-modify-button">Create Team</button>
        </div>
      </form>
    </div>
  );
};

export default CreateModifyTeam;
