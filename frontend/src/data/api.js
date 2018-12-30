import properties from "../Properties";

const defaultHeaders = {
    "Content-Type": "application/json"
};

function handleResponse(resp) {
    return resp.json().then(body => {
        if (resp.ok) {
            return body;
        }

        throw new Error(body.msg);
    });
}

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
    const url = id
        ? `${properties.APIURLs.member}/${id}`
        : properties.APIURLs.member;
    return fetch(url, {
        headers: { ...defaultHeaders, "user-token": window.workhubToken }
    });
}

function doLogout() {
    return fetch(properties.APIURLs.logout, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        }
    });
}

function doCreateJob(body) {
    return fetch(properties.APIURLs.createJob, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify(body)
    }).then(handleResponse);
}

function doCreateBid(jobId, description, amount) {
    return fetch(properties.APIURLs.createBid, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify({
            job_id: jobId,
            description,
            amount
        })
    }).then(handleResponse);
}

function doGetJobDetail(jobId) {
    return fetch(`${properties.APIURLs.jobDetail}/${jobId}`, {
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        }
    }).then(handleResponse);
}

function doGetAllJobs() {
    return fetch(properties.APIURLs.allJobs, {
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        }
    }).then(handleResponse);
}

function doGetJobBids(jobId) {
    return fetch(`${properties.APIURLs.jobBids}/${jobId}`, {
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        }
    }).then(handleResponse);
}

function doAcceptBid(bidId) {
    return fetch(properties.APIURLs.acceptBid, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify({
            bid_id: bidId
        })
    }).then(handleResponse);
}

function doCreateAnnotation(jobId, annotation) {
    return fetch(`${properties.APIURLs.createAnnotation}/${jobId}`, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify({
            text: annotation.text,
            position_x: annotation.startOffset,
            position_y: annotation.endOffset
        })
    }).then(handleResponse);
}

export {
    doLogin,
    doGetMember,
    doLogout,
    doCreateJob,
    doGetJobDetail,
    doGetAllJobs,
    doCreateBid,
    doGetJobBids,
    doAcceptBid,
    doCreateAnnotation
};
