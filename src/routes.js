import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import CreateModifyTeam from "./screens/CreateModifyTeam/CreateModifyTeam";
import CreateLeague from "./screens/CreateLeague/CreateLeague";
import CreateMatchup from "./screens/CreateMatchup/CreateMatchup";
import MatchupDisplay from "./screens/MatchupDisplay/MatchupDisplay";
import EditPlayer from "./screens/EditPlayer/EditPlayer";
import LeagueDetails  from "./screens/LeagueDetails/LeagueDetails";
import LeagueStandings from "./screens/LeagueStandings/LeagueStandings";

import Layout from "./components/Layout";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<Layout><Dashboard /></Layout>} />
        <Route path="/my-CreateTeam" element={<Layout><CreateModifyTeam /></Layout>} /> 
        <Route path="/Create-League" element={<Layout><CreateLeague /></Layout>} /> 
        <Route path="/CreateMatchup" element={<Layout><CreateMatchup /></Layout>} /> 
        <Route path="/MatchupDisplay" element={<Layout><MatchupDisplay /></Layout>} /> 
        <Route path="/EditPlayer" element={<Layout><EditPlayer /></Layout>} /> 
        <Route path="/league-details" element={<Layout><LeagueDetails /></Layout>} /> 
        <Route path="/league-standings" element={<Layout><LeagueStandings /></Layout>} /> 

      </Routes>
    </Router>
  );
};

export default RoutesComponent;
