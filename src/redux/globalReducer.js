import { FETCH_GLOBAL_DATA_SUCCESS,
  FETCH_LOGIN_SUCCESS,SET_ACCOUNERID,SET_LOGOUT,
  GET_LEAGUEDTEAILS,CLEAR_API_ERROR,
  
  SET_API_ERROR } from "./globalActions";

const initialState = {
  globalData: null,
  apiError: false,
  errorMessage: "",
  loginData:null,
  getleaguedetails:[],
  leagueteamownerId: localStorage.getItem("leagueteamownerId") || null,
  teamNames: [],
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case FETCH_GLOBAL_DATA_SUCCESS:
      return { ...state, globalData: action.payload, apiError: false };

      case FETCH_LOGIN_SUCCESS:
        return { ...state, loginData: action.payload, apiError: false };
        case SET_API_ERROR:
          return { ...state, apiError: true, errorMessage: action.payload };
          case CLEAR_API_ERROR: 
          return { ...state, apiError: false, errorMessage: "" };

    case GET_LEAGUEDTEAILS:
      const leagueData = Array.isArray(action.payload) ? action.payload : [];

      const filteredTeams = leagueData.filter(team => team.status === "JOINED");      return {
        ...state,
        getleaguedetails: action.payload,
        teamNames: filteredTeams.map(team => team.teamName), // Store only JOINED team names
      };
      case SET_ACCOUNERID:
        return {
          ...state,
          leagueteamownerId: action.payload,
        };
      case SET_LOGOUT:
        localStorage.removeItem("leagueteamownerId");
        return {
          ...state,
          leagueteamownerId: null,
        };

    default:
      return state;
  }
};

export default globalReducer;
