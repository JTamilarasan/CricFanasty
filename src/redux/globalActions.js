import { fetchGlobalData ,getLogindetailsData} from "../api/api";

export const FETCH_GLOBAL_DATA_SUCCESS = "FETCH_GLOBAL_DATA_SUCCESS";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";

export const SET_API_ERROR = "SET_API_ERROR";

export const loadGlobalData = () => async (dispatch) => {
  try {
    const data = await fetchGlobalData();
    dispatch({ type: FETCH_GLOBAL_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_API_ERROR, payload: "API request failed." });
  }
};

export const getapiLoginDatadetails = (Payload,post) => async (dispatch) => {
  console.log(Payload,post,"Payload")
  try {
    const data = await getLogindetailsData(Payload,post);
    console.log("APILoginData:", data);

    if (data && data) { 
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
      return data;  
    } 
    // else {
    //   //dispatch({ type: SET_API_ERROR, payload: "Invalid login response" });
    //   throw new Error("Invalid login response");
    // }
  } catch (error) {
    console.error("Login API errorMessage:", error);

    const errorMessage = error || "API request failed.";
    // dispatch({ type: "SET_API_ERROR", payload: errorMessage });
    console.log(errorMessage,"errorMessage")

    return Promise.reject(errorMessage); 
  }
};
