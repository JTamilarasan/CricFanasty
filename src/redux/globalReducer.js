import { FETCH_GLOBAL_DATA_SUCCESS,
  FETCH_LOGIN_SUCCESS,
  
  SET_API_ERROR } from "./globalActions";

const initialState = {
  globalData: null,
  apiError: false,
  errorMessage: "",
  loginData:null,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GLOBAL_DATA_SUCCESS:
      return { ...state, globalData: action.payload, apiError: false };

      case FETCH_LOGIN_SUCCESS:
        return { ...state, loginData: action.payload, apiError: false };
  

    case SET_API_ERROR:
      return { ...state, apiError: true, errorMessage: action.payload };

    default:
      return state;
  }
};

export default globalReducer;
