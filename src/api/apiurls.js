// import mockGlobalData from "./mockData/details.json";
import {  mockMode } from "./apiConfig";



export const apiUrls={
    loginscreenurl:!mockMode?"/token/authenticate":'/mockData/details.json',
    signupurl:!mockMode?"/api/cricfantasy/createUser":'/mockData/signup.json',
    fetchLeaguesurl:"/api/leagueteam/leagueteamowner/",
    createleague:"/api/createleague",
    createTeam:"/api/leagueteam"
}