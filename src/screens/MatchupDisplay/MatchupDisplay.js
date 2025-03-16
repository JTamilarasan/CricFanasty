import React, { useEffect, useState } from "react";
import "./MatchupDisplay.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getListMatchdetails ,getListmatchteamsdetails,clearvalues} from "../../redux/globalActions";





const MatchupDisplay = () => {
  const tournamentName = "IPL 2025"; 
  const leagueName = "Premier League"; 
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState([]);
  const dispatch = useDispatch();
  const matchlistDetails = useSelector((state) => state.global.getmatchlistdetails) || [];
  const matchteamlistDetails = useSelector((state) => state.global.getmatchteamlistdetails) || [];

  const [selectedMatch, setSelectedMatch] = useState("");

  useEffect(() => {
    if (matchteamlistDetails && matchteamlistDetails.length > 0) {
      setTeamList(matchteamlistDetails);
      console.log("UpdatedteamList:", matchteamlistDetails);
    } else {
      setTeamList([]); // Clear list if no teams found
    }
  }, [matchteamlistDetails]);

      
  
   useEffect(() => {
         dispatch(getListMatchdetails(1,true)); // Fetch league data
         console.log(matchlistDetails,"matchlistDetails")
      }, []);
    

      const handleMatchSelect = (event) => {
        const selectedId = event.target.value;
        const matchData = matchlistDetails.find(match => match.cricTournamentId.toString() === selectedId);
    
        if (matchData) {
          setSelectedMatch(selectedId);
          
        //  callMatchApi(matchData.cricTournamentId); call api
        dispatch(getListmatchteamsdetails(1,true)); // Fetch league data

        }
      };

  const handleOkClick = () => {
    //window.history.back(); // Navigate to the previous page
    navigate('/home')
    dispatch(clearvalues())

  };

  const handleback = () => {
    setTeamList([]); // Reset team list when navigating away
    navigate(-1); // Navigate to the previous page
    dispatch(clearvalues())
  };

  return (
    <div className="matchup-container">
      {/* <div className="matchup-heading">Matchup Display</div> */}
 <div className="header-container">
        <div className="back-button" onClick={() => handleback()}>
          <FaArrowLeft size={20} /> <span>Back</span>
        </div>
        <h2 className="page-title">Matchup Display</h2>
      </div>
      {/* Tournament & League Name */}
      <div className="matchup-info">
        <p><strong>Tournament Name:</strong> {tournamentName}</p>
        <p><strong>League Name:</strong> {leagueName}</p>
      </div>

      {/* Match Dropdown */}
      <div className="matchup-dropdown">
        <label><strong>Select Match:    </strong></label>
        <select 
        id="matchDropdown" 
        value={selectedMatch} 
        onChange={handleMatchSelect}
        className="match-dropdown"
      >
        <option value="">-- Select Match --</option>
        {matchlistDetails.length > 0 ? (
          matchlistDetails.map((match) => {
            const team1 = match.cricTeamMasterteam1Name || "Unknown";
            const team2 = match.cricTeamMasterteam2Name || "Unknown";
            return (
              <option key={match.id} value={match.cricTournamentId}>
                {team1} vs {team2}
              </option>
            );
          })
        ) : (
          <option disabled>No Matches Available</option>
        )}
      </select>
    </div>

      {/* Match Details */}
      {/* <div className="matchup-box">
        {selectedMatch.teams.map((teamPair, index) => (
          <p key={index}>{teamPair[0]} <span className="vs">vs</span> {teamPair[1]}</p>
        ))}
      </div> */}
{teamList && teamList.length > 0 &&
       <div className="matchup-box">
        {teamList && teamList.map((teamPair, index) => (
          <p key={index}>{teamPair.team1} <span className="vs">vs</span> {teamPair.team2}</p>
        ))}
      </div>

}

      {/* OK Button */}
      <div className="matchup-button-container">
        <button className="matchup-button" onClick={handleOkClick}>OK</button>
      </div>
    </div>
  );
};

export default MatchupDisplay;
