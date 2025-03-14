import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import "./CreateLeague.css";

const CreateLeague = () => {
  const [leagueName, setLeagueName] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [points, setPoints] = useState({
    win: "",
    runPercent: "",
    srPercent: "",
    wktsPercent: "",
    erPercent: "",
  });
  const [allLeagues, setAllLeagues] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedLeagues = JSON.parse(localStorage.getItem("leagues")) || [];
    setAllLeagues(savedLeagues);
  }, []);

  useEffect(() => {
    localStorage.setItem("leagues", JSON.stringify(allLeagues));
  }, [allLeagues]);

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleEmailChange = (newValue) => {
    setSelectedEmails(newValue);
  };

  const handleCreateEmail = (inputValue) => {
    if (isValidEmail(inputValue)) {
      if (selectedEmails.length >= 10) {
        setErrorMessage({ ...errorMessage, emails: "You can only add up to 10 emails." });
        return;
      }
      setSelectedEmails([...selectedEmails, { value: inputValue, label: inputValue }]);
      setErrorMessage({ ...errorMessage, emails: "" });
    } else {
      setErrorMessage({ ...errorMessage, emails: "Invalid email format." });
    }
  };

  const handlePointsChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setPoints((prev) => ({ ...prev, [name]: value }));
      setErrorMessage({ ...errorMessage, [name]: "" });
    } else {
      setErrorMessage({ ...errorMessage, [name]: "Please enter a valid number." });
    }
  };

  const handleAddLeague = () => {
    let errors = {};

    if (!leagueName.trim()) {
      errors.leagueName = "League name cannot be empty.";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(leagueName)) {
      errors.leagueName = "League name must be alphanumeric.";
    }

    if (selectedEmails.length < 4) {
      errors.emails = "You must add at least 4 emails to create a league.";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    const newLeague = {
      name: leagueName,
      emails: selectedEmails.map((email) => email.value),
      points,
    };

    if (editIndex !== null) {
      const updatedLeagues = [...allLeagues];
      updatedLeagues[editIndex] = newLeague;
      setAllLeagues(updatedLeagues);
      setEditIndex(null);
    } else {
      setAllLeagues([...allLeagues, newLeague]);
    }

    setLeagueName("");
    setSelectedEmails([]);
    setPoints({
      win: "",
      runPercent: "",
      srPercent: "",
      wktsPercent: "",
      erPercent: "",
    });
    setErrorMessage({});
  };

  return (
    <div className="create-league-container">
      <h2 style={{ marginLeft: "-100px" }}>Create League</h2>

      <div className="form-container">
        <div className="form-group">
          <label>League Name</label>
          <input
            type="text"
            className={`create-league-input ${errorMessage.leagueName ? "input-error" : ""}`}
            placeholder="Enter League Name"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
          {errorMessage.leagueName && <span className="validation-message">{errorMessage.leagueName}</span>}
        </div>

        <div className="form-group">
          <label>Emails</label>
          <CreatableSelect
            isMulti
            value={selectedEmails}
            onChange={handleEmailChange}
            onCreateOption={handleCreateEmail}
            placeholder="Type emails & press Enter"
            noOptionsMessage={() => "Type an email and press Enter"}
            className={`email-select ${errorMessage.emails ? "input-error" : ""}`}
          />
          {errorMessage.emails && <span className="validation-message">{errorMessage.emails}</span>}
        </div>

        {Object.keys(points).map((key) => (
          <div className="form-group" key={key}>
            <label>Points Per {key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type="text"
              name={key}
              className={`create-league-input ${errorMessage[key] ? "input-error" : ""}`}
              placeholder={`Enter points per ${key}`}
              value={points[key]}
              onChange={handlePointsChange}
            />
            {errorMessage[key] && <span className="validation-message">{errorMessage[key]}</span>}
          </div>
        ))}

        <div className="button-container">
          <button className="add-league-btn" onClick={handleAddLeague}>
            {editIndex !== null ? "Update League" : "Create League"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLeague;
