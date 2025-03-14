// import mockGlobalData from "./mockData/details.json";
import {  mockMode } from "./apiConfig";



export const apiUrls={
    loginscreenurl:!mockMode?"/token/authenticate":'/mockData/details.json'
}