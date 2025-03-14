import React from "react";
import "./CreateMatchup.css";

const CreateMatchup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const teamNames=['cks','MI']

  return (
    <div className="create-matchup-container">
      <div className="create-matchup-heading">Create Matchup</div>
      <form onSubmit={handleSubmit}>

        <div className="create-matchup-form-group">
          <span className="create-matchup-label">Tournament Name:</span>
          <span className="create-matchup-value">{"tournamentName"}</span>
        </div>

        <div className="create-matchup-form-group">
          <span className="create-matchup-label">League Name:</span>
          <span className="create-matchup-value">{"leagueName"}</span>
        </div>

        <div className="create-matchup-form-group">
          <span className="create-matchup-label">Team Names:</span>
          <div className="create-matchup-team-list">
            {teamNames.length > 0 ? (
              teamNames.map((team, index) => (
                <p key={index} className="create-matchup-team">{team}</p>
              ))
            ) : (
              <p>No Teams Available</p>
            )}
          </div>
        </div>

        <div className="create-matchup-button-container">
          <button type="submit" className="create-matchup-button">Create Matchup</button>
        </div>
      </form>
    </div>
  );
};

export default CreateMatchup;
