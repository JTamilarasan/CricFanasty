import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LeagueStandings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { league } = location.state || {};

  if (!league) {
    navigate(-1);
    return null;
  }

  return (
    <div className="page-container">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>League Standings - {league.teamName}</h2>
    </div>
  );
};

export default LeagueStandings;
