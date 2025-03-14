import axios from "axios";

export const hostServer=window.location.hostname==='localhost'?"localhost":"server";
const originUrl=window.location.origin;

export const mockMode = true; // Set to false for real API calls

export const mockResponsemode=hostServer==="server"?false:mockMode;

export const newurl="http://13.234.4.214:8016"

// export const serverurl=originUrl+newurl;

export const serverurl=newurl;


console.log(serverurl,"serverurl")


export const httpGetServices=(url)=>{

  const requestUrl=serverurl+url;

  let apiURL=mockResponsemode?"https://localhost:3000"+url:requestUrl;

  return axios.get(apiURL)
}


export const httpServices = async (requestData, method, url) => {
  const requestUrl = serverurl + url;
  let apiURL = mockResponsemode ? "https://localhost:3000" + url : requestUrl;

  console.log("API Request Sent:", {
    url: apiURL,
    method,
    data: requestData,
  });

  try {
    const response = await axios({
      url: apiURL,
      method: mockResponsemode ? "GET" : method,
      data: requestData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("API Response:", response);

    if (response && response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("API Error:", error);

    let errorMessage = "API request failed. Please try again.";
    if (error.response) {
      errorMessage = error.response.data?.error || `Error ${error.response.status}: ${error.response.statusText}`;
    }

    throw new Error(errorMessage); // ✅ Fix: Throw properly formatted error
  }
};


export const httpPostServices=(url,data)=>{

  const requestUrl=serverurl+url;

  let apiURL=mockResponsemode?"https://localhost:3000"+url:requestUrl;

  return axios.post(apiURL,data)
}



const localAPI = "http://localhost:3000/api";
const prodAPI = "https://myprepay.com/api";

export const API_BASE_URL = mockMode
  ? "" // No network requests for mock mode
  : process.env.NODE_ENV === "development"
  ? localAPI
  : prodAPI;
 
