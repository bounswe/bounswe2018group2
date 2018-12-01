const baseURL = "http://localhost:3000";
const properties = {
    APIURLs: {
        login: `${baseURL}/user/login`,
        logout: `${baseURL}/user/logout`,
        signup: `${baseURL}/user/create`,
        member: `${baseURL}/member`,
        allJobs: `${baseURL}/job/getalljobs`,
        createJob: `${baseURL}/job/create`,
        jobDetail: `${baseURL}/job/details`,
        jobBids: `${baseURL}/job/getallbids`,
        createBid: `${baseURL}/job/createbid`
    }
};

export default properties;
