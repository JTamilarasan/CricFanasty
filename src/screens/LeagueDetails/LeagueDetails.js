import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LeagueNewDetails.css"; // Use updated CSS file

const LeagueDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("league");

  const location = useLocation();
  const { league } = location.state || {}; // Retrieve league data from state

  if (!league) {
    navigate(-1);
    return null;
  }

  return (
    <div className="leaguenewdetails-container">
      {/* Header Section with Back Button and Centered Name */}
      <div className="leaguenewdetails-header">
        <button className="leaguenewdetails-back-button" onClick={() => navigate(-1)}>⬅ Back</button>
        {/* <h2 className="leaguenewdetails-name">{league.teamName}</h2> */}
                <h2 className="leaguenewdetails-name">{"League Details"}</h2>

      </div>

      {/* Tabs Section */}
      <div className="leaguenewdetails-tabs-container">
        <button
          className={`leaguenewdetails-tab-button ${activeTab === "league" ? "active" : ""}`}
          onClick={() => setActiveTab("league")}
        >
          League
        </button>
        <button
          className={`leaguenewdetails-tab-button ${activeTab === "teams" ? "active" : ""}`}
          onClick={() => setActiveTab("teams")}
        >
          Teams
        </button>
      </div>

      {/* Tab Content */}
      <div className="leaguenewdetails-tab-content">
        {activeTab === "league" ? (
          <div className="leaguenewdetails-league-actions">
            <button className="leaguenewdetails-action-button" onClick={() => navigate("/league-standings", { state: { league } })}>
              Standings
            </button>
            <button className="leaguenewdetails-action-button" onClick={() => navigate("/CreateMatchup", { state: { league } })}>
              Matchup
            </button>
          </div>
        ) : (
          <div className="leaguenewdetails-team-actions">
            <button className="leaguenewdetails-action-button" onClick={() => navigate("/player-edit", { state: { league } })}>
              Player Edit
            </button>
            <button className="leaguenewdetails-action-button" onClick={() => navigate("/game-matchup", { state: { league } })}>
              Game Matchup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueDetails;
