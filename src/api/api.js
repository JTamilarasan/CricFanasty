import axios from "axios";
import { API_BASE_URL, httpServices, mockMode } from "./apiConfig";
import mockGlobalData from "./mockData/details.json";
import auth from "./mockData/auth.json";
import leagueteamownervalue from "./mockData/leagueteamownervalue.json";



export const new_url="http://13.234.4.214:8016"

const fetchData = async (endpoint, mockData) => {
  if (mockMode) {
    console.log(`Using Mock Data: ${endpoint}`);
    return mockData;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`API Error: ${endpoint}`);
    throw error;
  }
};

const getfetchgetdetailsData=async (leagueteamownerId,apiname, mockData) => {
  console.log("dsdsds",mockData)
  if (mockMode) {
    return mockData;
  }
let endpoint=leagueteamownerId;
let API_BASE_URL=new_url+apiname;
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    // console.error(`API Error: ${endpoint}`);
    // throw error;
  }
};

const getLogindetails = async (Payload, post, mockData,apiname,showerror=false) => {
  if (mockMode) {
    return mockData;
  }

  let reqData = Payload;
  let method = post === "post" ? "POST" : "GET";
  let loginurl = apiname;

  try {
    console.log(reqData, method, loginurl,"skdsk")
    const response = await httpServices(reqData, method, loginurl);
    console.log("LoginResponse:", response);

    if (response) {
      return response; // ✅ Return response directly
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error in getLogindetails:", error);
    if(showerror){
      throw error;

    }
else{
    return Promise.reject(error.message || "API request failed. Please try again."); 
}
  }
};

const getLoginAUthGetdetails = async (email,token, mockData,apiname) => {
  if (mockMode) {
    return mockData;
  }

  const authApiUrl = `http://13.234.4.214:8016/api/cricfantasy/authorizeUserRequest/${email}`;

  try {
    const authResponse = await fetch(authApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (authResponse) {
      return authResponse; 
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error in getLogindetails:", error);

    return Promise.reject(error.message || "API request failed. Please try again."); 
  }
};

const getcreatedetails = async (Payload, post, mockData,apiname,showerror=false) => {
  if (mockMode) {
    return mockData;
  }

  let reqData = Payload;
  let method =  "POST" ;
  let loginurl = apiname;

  try {
    console.log(reqData, method, loginurl,"skdsk")
    const response = await httpServices(reqData, method, loginurl);
    console.log("LoginResponse:", response);

    if (response) {
      return response; // ✅ Return response directly
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error in getLogindetails:", error);
    if(showerror){
      return Promise.reject(error.message || "API request failed. Please try again."); 

    }
else{
    return Promise.reject(error.message || "API request failed. Please try again."); 
}
  }
};

export const fetchGlobalData = async () => await fetchData("global", mockGlobalData);
export const getLogindetailsData = async (Payload,post,apiname) => {
  return await getLogindetails(Payload,post,mockGlobalData,apiname);
};

export const getLoginAuthdetailsData = async (Payload,token,apiname) => {
  return await getLoginAUthGetdetails(Payload,token,auth,apiname);
};
export const getfetchdetailsData = async (leagueteamownerId,apiname) => {
  return await getfetchgetdetailsData(leagueteamownerId,apiname,leagueteamownervalue);
};

export const getCreate_details=async (Payload,post,apiname,showerror) => {
  return await getcreatedetails(Payload,post,mockGlobalData,apiname,showerror);
};



