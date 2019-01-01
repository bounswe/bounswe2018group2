const baseURL = "http://34.210.153.98:3000";
const properties = {
    APIURLs: {
        login: `${baseURL}/user/login`,
        logout: `${baseURL}/user/logout`,
        signup: `${baseURL}/user/create`,
        member: `${baseURL}/member`,
        allJobs: `${baseURL}/job/getalljobs`,
        selfJobs: `${baseURL}/job/getselfjobs`,
        createJob: `${baseURL}/job/create`,
        jobDetail: `${baseURL}/job/details`,
        jobBids: `${baseURL}/job/getallbids`,
        createBid: `${baseURL}/job/createbid`,
        acceptBid: `${baseURL}/job/acceptbid`,
        createAnnotation: `${baseURL}/job/createannotation`,
        requestUpdate: `${baseURL}/job/requestupdate`,
        createUpdate: `${baseURL}/job/createupdate`,
        relatedWords: "https://api.datamuse.com/words",
        upload: `${baseURL}/media/upload`
    }
};

export default properties;
