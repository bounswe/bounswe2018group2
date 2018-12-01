const baseURL = "http://34.210.153.98:3000";
const properties = {
    APIURLs: {
        login: `${baseURL}/user/login`,
        logout: `${baseURL}/user/logout`,
        signup: `${baseURL}/user/create`,
        member: `${baseURL}/member`,
        allJobs: `${baseURL}/job/getalljobs`,
        createJob: `${baseURL}/job/create`,
        jobDetail: `${baseURL}/job/details`,
        createBid: `${baseURL}/job/createbid"`
    }
};

export default properties;
