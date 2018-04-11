(() => {
    const singleTweetTemplate = document.querySelector("#singleTweet");
    const tweetsContainer = document.querySelector("#tweetsContainer");

    function populateSingleTweet(tweetData) {
        const singleTweetImportedNode = document.importNode(singleTweetTemplate.content, true);

        const $user = singleTweetImportedNode.querySelector(".js-user");
        const $content = singleTweetImportedNode.querySelector(".js-content");
        const $rtCount = singleTweetImportedNode.querySelector(".js-rt-count");
        const $likeCount = singleTweetImportedNode.querySelector(".js-like-count");
        const $stealButton = singleTweetImportedNode.querySelector(".js-steal-tweet");

        $user.innerText = tweetData.user;
        $content.innerText = tweetData.content;
        $rtCount.innerText = tweetData.rt_count;
        $likeCount.innerText = tweetData.like_count;
        $stealButton.addEventListener("click", () => {
            stealTweet(tweetData.content);
        });
        tweetsContainer.appendChild(singleTweetImportedNode);
    }

    getTweets().then(tweets => {
        tweets.forEach(populateSingleTweet);
    });
})();