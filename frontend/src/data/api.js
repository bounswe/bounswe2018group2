import properties from "../Properties";

const defaultHeaders = {
    "Content-Type": "application/json"
};

function doLogin(email, password) {
    return fetch(properties.APIURLs.login, {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
        headers: defaultHeaders
    });
}

function doGetMember(id) {
    const url = id ? `${properties.APIURLs.member}/${id}` : properties.APIURLs.member;
    return fetch(url, {
        headers: {...defaultHeaders, "userToken": window.workhubToken }
    });
}

export {
    doLogin,
    doGetMember
}