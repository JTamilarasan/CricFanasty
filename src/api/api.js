import axios from "axios";
import { API_BASE_URL, httpServices, mockMode } from "./apiConfig";
import mockGlobalData from "./mockData/details.json";
import auth from "./mockData/auth.json";
import leagueteamownervalue from "./mockData/leagueteamownervalue.json";
import creatematch from "./mockData/creatematch.json";
import matchlist from "./mockData/matchlist.json";
import matchteamlist from "./mockData/matchteamlist.json";






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


const getfetch_alldetails=async(apiparam,apiname,useMock = true)=>{
  console.log(useMock,mockMode,"mockMode")
  if(useMock && mockMode){
    return  creatematch;
  }
  let endpoint=apiparam;
let API_BASE_URL=new_url+apiname;
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
     if (!response || !response.data) {
      throw new Error("API response is empty");
    }

    return response.data;
  } catch (error) {
    console.error(`API Error: ${endpoint}`);
    return Promise.reject(error.message || "API request failed. Please try again."); 
  }


}
const getmatch_alldetails=async(apiparam,apiname,useMock = true)=>{
  console.log(useMock,mockMode,"mockMode")
  if(useMock && mockMode){
    return  matchlist;
  }
  let endpoint=apiparam;
let API_BASE_URL=new_url+apiname;
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
     if (!response || !response.data) {
      throw new Error("API response is empty");
    }

    return response.data;
  } catch (error) {
    console.error(`API Error: ${endpoint}`);
    return Promise.reject(error.message || "API request failed. Please try again."); 
  }


}
const getmatchlis_talldetails=async(apiparam,apiname,useMock = true)=>{
  console.log(useMock,mockMode,"mockMode")
  if(useMock && mockMode){
    return  matchteamlist;
  }
  let endpoint=apiparam;
let API_BASE_URL=new_url+apiname;
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
     if (!response || !response.data) {
      throw new Error("API response is empty");
    }

    return response.data;
  } catch (error) {
    console.error(`API Error: ${endpoint}`);
    return Promise.reject(error.message || "API request failed. Please try again."); 
  }


}



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

const postMatchListAllDetails = async (apiname, body,  useMock = true) => {
  console.log(useMock, mockMode, "mockMode");

  if (useMock && mockMode) {
    return matchteamlist;
  }

  let API_BASE_URL = new_url + apiname; // No apiparam in the URL

  try {
    const response = await axios.post(API_BASE_URL, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"token"}`,
      },
    });

    if (!response || !response.data) {
      throw new Error("API response is empty");
    }

    return response.data;
  } catch (error) {
    console.error(`API Error: ${API_BASE_URL}`, error);
    return Promise.reject(error.message || "API request failed. Please try again.");
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


export const getfetchalldetails=async (leagueid,apiname,usemock) => {
  return await getfetch_alldetails(leagueid,apiname,usemock);
};

export const getmatchalldetails=async (leagueid,apiname,usemock) => {
  return await getmatch_alldetails(leagueid,apiname,usemock);
};
export const getmatchlistalldetails=async (leagueid,apiname,usemock) => {
  return await getmatchlis_talldetails(leagueid,apiname,usemock);
};

export const postmatchcall=async (reqbody,apiname,usemock) => {
  return await postMatchListAllDetails(reqbody,apiname,usemock);
};



