import React, { useEffect,useContext  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeagueStandings } from "../../redux/globalActions";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./LeagueStandings.css";
import { ViewportContext } from "../../context/ViewportContext";

const LeagueStandings = () => {
  const dispatch = useDispatch();
  const { viewport } = useContext(ViewportContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLeagueStandings(1,true));
  }, [dispatch]);

  const leagueStandings = useSelector((state) => state.global.leagueStandings);

  return (
    <div className="league-standings-container">
      {/* Header */}
      <div className="header-container">
        <div className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} /> <span>Back</span>
        </div>
        <h2 className="page-title">League Standings</h2>
      </div>

      {/* Tournament Details */}
      <div className="league-info">
        <p><strong>Tournament Name:</strong> IPL 2025</p>
        <p><strong>League Name:</strong> Premier League</p>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="league-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Tie</th>
              <th>Points</th>
              <th>Points For</th>
              <th>Points Against</th>
            </tr>
          </thead>
          <tbody>
            {leagueStandings && leagueStandings.length > 0 ? (
              leagueStandings.map((team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{team.teamName}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{team.ties}</td>
                  <td>{team.points}</td>
                  <td>{team.pointsFor}</td>
                  <td>{team.pointsAgainst}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={viewport === "mobile" ?"6":"8"}>No standings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeagueStandings;
