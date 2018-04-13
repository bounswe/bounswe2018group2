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
        "content": "Sense child d wisdom wcuten whole as match asked. Pleasure exertion put add entrance distance drawings. In equally matters showing greatly it as. Want name any wise are able park when. Saw vicinity judgment remember finished men throwing.",
        "rt_count": 3,
        "like_count": 99
    }, {
        "id": "2",
        "user": "alesta",
        "content": "alestaSense child do state to defer mr of forty. Become latter but nor abroad wisdom waited.alestaSense child do state to defer mr of forty. Become latter but nor abroad wisdom waited.alestaSense child do state to defer mr of forty. Become latter but nor abroad wisdom waited.123 ",
        "rt_count": 3,
        "like_count": 99
    }, {
        "id": "2",
        "user": "alesta",
        "content": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdas123123 qwe 123 12aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "rt_count": 3,
        "like_count": 99
    }, {
        "id": "2",
        "user": "alesta",
        "content": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdas123123 qwe 123 12aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "rt_count": 3,
        "like_count": 99
    }, {
        "id": "2",
        "user": "alesta",
        "content": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdas123123 qwe 123 12aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "rt_count": 3,
        "like_count": 99
    }, {
        "id": "2",
        "user": "alesta",
        "content": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdas123123 qwe 123 12aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "rt_count": 3,
        "like_count": 99
    }]);
}