import React, { useState } from "react";
import "./MatchupDisplay.css";

const MatchupDisplay = () => {
  const tournamentName = "IPL 2025"; // Static Value
  const leagueName = "Premier League"; // Static Value

  // Static Match List
  const matches = [
    { id: 1, name: "Match 1", teams: [["T1", "T2"], ["T3", "T4"], ["T5", "T6"], ["T7", "T8"]] },
    { id: 2, name: "Match 2", teams: [["A1", "A2"], ["B1", "B2"], ["C1", "C2"], ["D1", "D2"]] },
    { id: 3, name: "Match 3", teams: [["X1", "X2"], ["Y1", "Y2"], ["Z1", "Z2"], ["W1", "W2"]] }
  ];

  const [selectedMatch, setSelectedMatch] = useState(matches[0]); // Default to first match

  const handleMatchChange = (event) => {
    const selectedMatchId = parseInt(event.target.value);
    const match = matches.find(m => m.id === selectedMatchId);
    setSelectedMatch(match);
  };

  const handleOkClick = () => {
    window.history.back(); // Navigate to the previous page
  };

  return (
    <div className="matchup-container">
      <div className="matchup-heading">Matchup Display</div>

      {/* Tournament & League Name */}
      <div className="matchup-info">
        <p><strong>Tournament Name:</strong> {tournamentName}</p>
        <p><strong>League Name:</strong> {leagueName}</p>
      </div>

      {/* Match Dropdown */}
      <div className="matchup-dropdown">
        <label><strong>Select Match:</strong></label>
        <select onChange={handleMatchChange} value={selectedMatch.id}>
          {matches.map(match => (
            <option key={match.id} value={match.id}>{match.name}</option>
          ))}
        </select>
      </div>

      {/* Match Details */}
      <div className="matchup-box">
        {selectedMatch.teams.map((teamPair, index) => (
          <p key={index}>{teamPair[0]} <span className="vs">vs</span> {teamPair[1]}</p>
        ))}
      </div>

      {/* OK Button */}
      <div className="matchup-button-container">
        <button className="matchup-button" onClick={handleOkClick}>OK</button>
      </div>
    </div>
  );
};

export default MatchupDisplay;
