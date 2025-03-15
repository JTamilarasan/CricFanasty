import { fetchGlobalData ,getLogindetailsData,getCreate_details,
  getLoginAuthdetailsData,getfetchdetailsData} from "../api/api";
import {apiUrls} from "../api/apiurls"
export const FETCH_GLOBAL_DATA_SUCCESS = "FETCH_GLOBAL_DATA_SUCCESS";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const SET_ACCOUNERID = "SET_ACCOUNERID";
export const SET_LOGOUT="SET_LOGOUT";
export const SET_API_ERROR = "SET_API_ERROR";
export const GET_LEAGUEDTEAILS = "GET_LEAGUEDTEAILS";
export const CLEAR_API_ERROR = "CLEAR_API_ERROR"; 


export const loadGlobalData = () => async (dispatch) => {
  try {
    const data = await fetchGlobalData();
    dispatch({ type: FETCH_GLOBAL_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_API_ERROR, payload: "API request failed." });
  }
};
export const clearApiError = () => ({
  type: CLEAR_API_ERROR, 
});

export const getapiLoginDatadetails = (Payload,post) => async (dispatch) => {
  console.log(Payload,post,"Payload")
  let apiname= apiUrls.loginscreenurl
  try {
    const data = await getLogindetailsData(Payload,post,apiname);
    console.log("APILoginData1:", data);
    

    if (data && data) { 
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
      dispatch(getAuthorizationDetails(Payload.email, data.token));
      return data;  
    } 
   
  } catch (error) {
    console.error("Login API errorMessage:", error);
    const errorMessage = error || "API request failed.";
    return Promise.reject(errorMessage); 
  }
};

export const getAuthorizationDetails=(email,token)=>async (dispatch) => {
  try {
    const data = await getLoginAuthdetailsData(email,token);
    console.log("tamilnew:", data);
    const { leagueteamownerId } = data;
    localStorage.setItem("leagueteamownerId", leagueteamownerId); 


    if (data && data) { 
      let getleaguedetails=data;
      dispatch({
        type: "GET_LEAGUEDTEAILS",
        payload: getleaguedetails,
      });
      return data;  
    } 
   
  } catch (error) {
    console.error("Login API errorMessage:", error);
    const errorMessage = error || "API request failed.";
    return Promise.reject(errorMessage); 
  }


}

export const fetchLeagues=(leagueteamownerId)=>async (dispatch) => {
  let apiname= apiUrls.fetchLeaguesurl
  try {
    const data = await getfetchdetailsData(leagueteamownerId,apiname);
    console.log("APILoginData1ss:", data);
    

    if (data && data) { 
      dispatch({
        type: "SET_ACCOUNERID",
        payload: leagueteamownerId,
      });
      dispatch({
        type: "GET_LEAGUEDTEAILS",
        payload: data,
      });
      
      return data;  
    } 
   
  } catch (error) {
    console.error("Login API errorMessage:", error);
    const errorMessage = error || "API request failed.";
    return Promise.reject(errorMessage); 
  }

}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("leagueteamownerId"); // Remove from localStorage
  dispatch({ type: "LOGOUT" }); // Dispatch logout action
};


export const getapiSigndetails = (Payload,post) => async (dispatch) => {
  let apiname= apiUrls.signupurl
  console.log(Payload,post,apiname,"dsdds")


  try {
    const data = await getLogindetailsData(Payload,post,apiname);
    console.log("APILoginData:", data);

    if (data && data) { 
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
      return data;  
    } 
   
  } catch (error) {
    console.error("Login API errorMessage:", error);

    const errorMessage = error || "API request failed.";
    console.log(errorMessage,"errorMessage")

    return Promise.reject(errorMessage); 
  }
};

export const getCreatedetails = (Payload,post) => async (dispatch) => {
  let apiname= apiUrls.createleague
  console.log(Payload,post,apiname,"dsdds")


  try {
    const data = await getCreate_details(Payload,post,apiname,true);
    console.log("APILoginData:", data);

    if (data && data) { 
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
      return data;  
    } 
   
  } catch (error) {
     console.error("LoginerrorMessage:", error);

    // const errorMessage = error || "API request failed.";
    // console.log(errorMessage,"errorMessage")

    // return Promise.reject(errorMessage); 
    dispatch({ type: SET_API_ERROR, payload: error ? error : "API request failed."  });
  }
};

export const getTeamdetails = (Payload,post) => async (dispatch) => {
  let apiname= apiUrls.createTeam
  console.log(Payload,post,apiname,"dsdds")


  try {
    const data = await getCreate_details(Payload,post,apiname,true);
    console.log("APILoginData:", data);

    if (data && data) { 
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
      return data;  
    } 
   
  } catch (error) {
     console.error("LoginerrorMessage:", error);

    // const errorMessage = error || "API request failed.";
    // console.log(errorMessage,"errorMessage")

    // return Promise.reject(errorMessage); 
    dispatch({ type: SET_API_ERROR, payload: error ? error : "API request failed."  });
  }
};



// export const getLeagueTeam = (get) => async (dispatch) => {
//   let apiname= apiUrls.signupurl
//   console.log(Payload,post,apiname,"dsdds")


//   try {
//     const data = await fetchGlobalData();
//     dispatch({ type: FETCH_GLOBAL_DATA_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: SET_API_ERROR, payload: "API request failed." });
//   }
// };


