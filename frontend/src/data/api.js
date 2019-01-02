import properties from "../Properties";

const defaultHeaders = {
    "Content-Type": "application/json"
};

let jobsResultCache = null;

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
    }).then(handleResponse);
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
    if (jobsResultCache) {
        return Promise.resolve(jobsResultCache);
    }

    return fetch(properties.APIURLs.allJobs, {
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        }
    }).then(handleResponse).then(jobsResult => {
        jobsResultCache = jobsResult;
        return jobsResult;
    });
}

function doGetSelfJobs() {
    return fetch(properties.APIURLs.selfJobs, {
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

function doGetRelatedWords(str) {
    const url = new URL(properties.APIURLs.relatedWords);
    const searchParams = new URLSearchParams();
    searchParams.append("ml", str);
    url.search = searchParams;
    return fetch(url).then(resp => {
        if (resp.ok) {
            return resp.json();
        }

        throw new Error("Couldn't fetch related words");
    });
}

function doUpload(base64File, name) {
    return fetch(properties.APIURLs.upload, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify({
            key: name,
            file: base64File
        })
    }).then(handleResponse);
}

function doRequestUpdate(jobId, description) {
    return fetch(properties.APIURLs.requestUpdate, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify({
            job_id: jobId,
            description
        })
    }).then(handleResponse);
}

function doCreateUpdate(jobId, type, description) {
    return fetch(properties.APIURLs.createUpdate, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify({
            job_id: jobId,
            type,
            description
        })
    });
}

function doGetAllCategories() {
    return fetch(properties.APIURLs.allCategories).then(handleResponse);
}

function doAddInterests(interestIds) {
    return fetch(properties.APIURLs.addInterests, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify({
            categories: interestIds
        })
    });
}

function doRemoveInterests(interestIds) {
    return fetch(properties.APIURLs.removeInterests, {
        method: "POST",
        headers: {
            ...defaultHeaders,
            "user-token": window.workhubToken
        },
        body: JSON.stringify({
            categories: interestIds
        })
    });
}

export {
    doLogin,
    doGetMember,
    doLogout,
    doCreateJob,
    doGetJobDetail,
    doGetAllJobs,
    doGetSelfJobs,
    doCreateBid,
    doGetJobBids,
    doAcceptBid,
    doCreateAnnotation,
    doGetRelatedWords,
    doUpload,
    doRequestUpdate,
    doCreateUpdate,
    doGetAllCategories,
    doAddInterests,
    doRemoveInterests
};
