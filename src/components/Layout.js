import React, { useState ,useEffect} from "react";
import { Link ,useLocation } from "react-router-dom";
import logodashboard from "./../assets/logodashboard.png"; 
import ballLoader from "./../assets/ballLoader.webp"; 
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/globalActions";




import "./Layout.css"; 
import { useNavigate } from "react-router-dom";


const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

    const navigate = useNavigate();
      const [loading, setLoading] = useState(true);
      const location = useLocation(); 

      useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 500);

      },[])
    
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlelogout=()=>
  {
    navigate("/"); 
    dispatch(logoutUser());
}
  return (
    <div className="layout-container">
               {loading && (
                <div className="loading-overlay">
                  <img src={ballLoader} alt="Loading..." className="ball-loader" />
                </div>
              )}
        
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <button className="hamburger-icon" onClick={toggleSidebar}>
            &#9776; {/* Hamburger icon */}
          </button>

          {/* Logo */}
          <img src={logodashboard} alt="IPL Logo" className="ipl-logo_img" />

          {/* User info and logout button */}
          <span className="login-name">Hello, User</span>
          <button className="logout-btn" onClick={handlelogout}>Logout</button>
        </div>
      </header>

      {/* Sidebar (Mobile: Below Header, Above Footer) */}

      {/* <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`} >
        <ul  onClick={toggleSidebar}>
          <li><Link to="/home"  onClick={toggleSidebar}>Dashboard</Link></li>
          <li><Link to="/Create-League">Create League</Link></li>
          <li><Link to="/my-CreateTeam">Create Team</Link></li>
          <li><Link to="/CreateMatchup">Create Matchup</Link></li>
          <li><Link to="/MatchupDisplay">MatchupDisplay</Link></li>          
          <li><Link to="/EditPlayer">EditPlayer</Link></li>
        </ul>
        dispatch(logoutUser());
      </nav>
 */}
      <div className="main-content">


      {/* Main Content Area */}
      <div className={`${location.pathname === "/Create-League" ? "content-area" : "main-area"}`}>{children}</div>
      {/* <div>{children}</div> */}

      </div>

      {/* Footer */}
      <footer className="footer">
        <span>© 2025 IPL Fantasy League</span>
      </footer>
    </div>
  );
};

export default Layout;
