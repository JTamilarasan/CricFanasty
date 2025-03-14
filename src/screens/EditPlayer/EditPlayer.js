import React, { useState } from "react";
import "./EditPlayer.css";

const EditPlayer = () => {
  const tournamentName = "IPL 2025"; // Static Value
  const leagueName = "Premier League"; // Static Value

  // Static Match List (Later will be from API)
  const matches = [
    { id: 1, name: "CSK vs MI", teams: { team1: "CSK", team2: "MI" } },
    { id: 2, name: "HYD vs DC", teams: { team1: "HYD", team2: "DC" } },
  ];

  // Static Player List for Now (Later will come from API)
  const players = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"];

  const [selectedMatch, setSelectedMatch] = useState(matches[0]); // Default Match
  const [team1Players, setTeam1Players] = useState({});
  const [team2Players, setTeam2Players] = useState({});
  const [winningTeam, setWinningTeam] = useState("");

  const handleMatchChange = (event) => {
    const matchId = parseInt(event.target.value);
    const match = matches.find((m) => m.id === matchId);
    setSelectedMatch(match);
    setWinningTeam(""); // Reset Winning Team
    setTeam1Players({});
    setTeam2Players({});
  };

  const handlePlayerChange = (team, role, value) => {
    if (team === "team1") {
      setTeam1Players({ ...team1Players, [role]: value });
    } else {
      setTeam2Players({ ...team2Players, [role]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Selection:", { selectedMatch, team1Players, team2Players, winningTeam });
  };

  return (
    <div className="edit-player-container">
      <div className="edit-player-heading">Edit Team Players</div>

      {/* Tournament & League Name */}
      <div className="edit-player-info">
        <p><strong>Tournament Name:</strong> {tournamentName}</p>
        <p><strong>League Name:</strong> {leagueName}</p>
      </div>

      {/* Match Dropdown */}
      <div className="edit-player-dropdown">
        <label><strong>Select Match:</strong></label>
        <select onChange={handleMatchChange} value={selectedMatch.id}>
          {matches.map((match) => (
            <option key={match.id} value={match.id}>{match.name}</option>
          ))}
        </select>
      </div>

      {/* Team 1 Selection */}
      <div className="edit-player-box">
        <h3>Team: {selectedMatch.teams.team1}</h3>
        {["Batsman 1", "Batsman 2", "Bowler 1", "Bowler 2"].map((role) => (
          <div key={role} className="edit-player-dropdown">
            <label>{role}:</label>
            <select onChange={(e) => handlePlayerChange("team1", role, e.target.value)}>
              <option value="">Select {role}</option>
              {players.map((player, index) => (
                <option key={index} value={player}>{player}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Team 2 Selection */}
      <div className="edit-player-box">
        <h3>Team: {selectedMatch.teams.team2}</h3>
        {["Batsman 1", "Batsman 2", "Bowler 1", "Bowler 2"].map((role) => (
          <div key={role} className="edit-player-dropdown">
            <label>{role}:</label>
            <select onChange={(e) => handlePlayerChange("team2", role, e.target.value)}>
              <option value="">Select {role}</option>
              {players.map((player, index) => (
                <option key={index} value={player}>{player}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Winning Team Dropdown */}
      <div className="edit-player-dropdown">
        <label><strong>Winning Team:</strong></label>
        <select onChange={(e) => setWinningTeam(e.target.value)} value={winningTeam}>
          <option value="">Select Winning Team</option>
          <option value={selectedMatch.teams.team1}>{selectedMatch.teams.team1}</option>
          <option value={selectedMatch.teams.team2}>{selectedMatch.teams.team2}</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="edit-player-button-container">
        <button className="edit-player-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EditPlayer;
