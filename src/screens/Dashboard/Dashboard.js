import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getLeagueTeam } from "../../redux/globalActions";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("myLeagues");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get league details from Redux store, ensuring it defaults to an empty array
  const leagueDetails = useSelector((state) => state.global.getleaguedetails) || [];

  // Debugging: Check if leagueDetails is being retrieved correctly
  useEffect(() => {
    console.log("League Details:", leagueDetails);
  }, [leagueDetails]); 

  return (
    <div className="home-container">
      <div className="tabs">
        <button
          className={activeTab === "myLeagues" ? "active" : ""}
          onClick={() => setActiveTab("myLeagues")}
        >
          My Leagues
        </button>
        <button
          className={activeTab === "createLeague" ? "active" : ""}
          onClick={() => navigate("/Create-League")}
        >
          Create League
        </button>
      </div>

      <div className="content">
        {activeTab === "myLeagues" && (
          <div className="league-list">
            {leagueDetails.length > 0 ? (
              leagueDetails.map((league, index) => (
                <div 
                onClick={() => league.status === "JOINED" && navigate("/league-details", { state: { league } })}
                key={league.id} className="league-item">
                <span>League {index + 1} - {league.status === "JOINED" ? league.teamName :
                  
                  <button className="join-button" onClick={() => navigate("/my-CreateTeam")}>
                  Join League
                </button>
                  }</span>
                {/* {league.status !== "JOINED" && (
                  <button className="join-button" onClick={() => navigate("/Create-Team")}>
                    Join
                  </button>
                )} */}
              </div>
              ))
            ) : (
              <p>No leagues available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
