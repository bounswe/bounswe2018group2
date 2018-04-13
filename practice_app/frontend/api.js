const config = {
    baseURL: "http://ec2-35-163-0-129.us-west-2.compute.amazonaws.com/api"
}

/**
 * Should make a post call with user token and tweetContent to twitter api or our api
 * @param {String} tweetContent
 */
function stealTweet(tweetContent) {
    const url = `${config.baseURL}/posttweet`;
    var data = new FormData();
    return fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            content: tweetContent
        }
    })
        .then(response => {
            console.log(response);
            // return response.json();
        })
        .catch(err => {
            console.error(err);
        });
}

function getTweets(hashtag) {
    const url = `${config.baseURL}/searchkey?key=${hashtag}&limit=5`;
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .catch(function(myJson) {
            console.error(myJson);
        });
}
