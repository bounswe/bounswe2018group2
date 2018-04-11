/**
 * An example get call is like this
 */
function exampleFetch() {
    return fetch("http://placekitten.com/300").then(function (response) {
        return response.json().then(function (resJson) {
            if (response.ok) {
                return resJson;
            }

            throw errors.createError(response.status, resJson);
        });
    });
}

/**
 * Should make a post call with user token and tweetContent to twitter api or our api
 * @param {String} tweetContent
 */
function stealTweet(tweetContent) {
    console.log("Şu alttaki tweet'i kendi twitterımızda paylaşmış olmamız gerek şimdi");
    console.log(tweetContent);
}

function getTweets() {
    return Promise.resolve([{
        "id": "1",
        "user": "ergunerdogmus",
        "content": "Alesta Rocks",
        "rt_count": 999,
        "like_count": 999
    }, {
        "id": "2",
        "user": "alesta",
        "content": "ne dedin sen?",
        "rt_count": 3,
        "like_count": 99
    }]);
}