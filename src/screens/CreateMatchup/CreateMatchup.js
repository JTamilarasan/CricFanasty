import React, { useEffect, useState } from "react";
import "./CreateMatchup.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
 import { getMatchUpdetails,postmatchup } from "../../redux/globalActions";
 import { useDispatch, useSelector } from "react-redux";




const CreateMatchup = () => {
  const dispatch = useDispatch();
  const matchUpDetails = useSelector((state) => state.global.getmatchupedetails);
  console.log(matchUpDetails,"matchUpDetails")
  const tournamentName = "IPL 2025"; // Static Value
  const leagueName = "Premier League"; // Static Value


  const handleSubmit =async  (e) => {
    
    e.preventDefault();
    const requestBody = {
      tournamentName,
      leagueName,
      teams: "teamNames", // Passing team names from API response
    };

    try {
      const response = await dispatch(postmatchup(requestBody,true));

      if (response) {
        navigate("/MatchupDisplay"); // Navigate on success
      } else {
        console.error("Error creating matchup:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("API error:", error);
    }

    // navigate("/MatchupDisplay"); // Navigate to MatchupDisplay page
  };

   useEffect(() => {
        dispatch(getMatchUpdetails(1,true)); // Fetch league data
    }, []);
  
    const navigate = useNavigate();

    const teamNames = Array.isArray(matchUpDetails)
    ? matchUpDetails.map((team) => team.teamName || "Unnamed Team")
    : [];
  

  return (
    <div className="create-matchup-container">
      <div className="header-container">
        <div className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} /> <span>Back</span>
        </div>
        <h2 className="page-title">Create Matchup</h2>
      </div>
      <form onSubmit={handleSubmit}>

      <div className="matchup-info">
        <p><strong>Tournament Name:</strong> {tournamentName}</p>
        <p><strong>League Name:</strong> {leagueName}</p>
      </div>
<br/>
        <div className="create-matchup-form-group">
  <span className="create-matchup-label">Team Names:</span>
  <div className="create-matchup-team-list">
    {teamNames.length > 0 ? (
      teamNames.map((team, index) => (
        <div key={index} className="create-matchup-team">{team}</div>
      ))
    ) : (
      <div>No Teams Available</div>
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
