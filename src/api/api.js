import axios from "axios";
import { API_BASE_URL, httpServices, mockMode } from "./apiConfig";
import {apiUrls} from "./apiurls"
import mockGlobalData from "./mockData/details.json";


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


const getLogindetails = async (Payload, post, mockData) => {
  if (mockMode) {
    return mockData;
  }

  let reqData = Payload;
  let method = post === "post" ? "POST" : "GET";
  let loginurl = apiUrls.loginscreenurl;

  try {
    const response = await httpServices(reqData, method, loginurl);
    console.log("Login API Response:", response);

    if (response) {
      return response; // ✅ Return response directly
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error in getLogindetails:", error);

    return Promise.reject(error.message || "API request failed. Please try again."); // ✅ Fix: Return a rejected promise instead of throwing
  }
};


export const fetchGlobalData = async () => await fetchData("global", mockGlobalData);
export const getLogindetailsData = async (Payload,post) => {
  return await getLogindetails(Payload,post,mockGlobalData);
};


