const baseURL = "http://localhost:3000";
const properties = {
    APIURLs: {
        login: `${baseURL}/user/login`,
        logout: `${baseURL}/user/logout`,
        signup: `${baseURL}/user/create`,
        member: `${baseURL}/member`,
        createJob: `${baseURL}/job/create`
    }
};

export default properties;
