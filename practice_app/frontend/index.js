(function () {
    const singleTweetTemplate = document.querySelector("#singleTweet");
    const tweetsContainer = document.querySelector("#tweetsContainer");
    const searchContainer = document.querySelector("#searchContainer");

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

    function flushTweets() {
        tweetsContainer.innerHTML = "";
    }

    function debounceFn(fn, input) {
        let timeout;
        return function () {
            let later = function () {
                timeout = null;
                fn(input);
            }
            clearTimeout(timeout);
            timeout = setTimeout(later, 1000);
        }
    }

    function initializeSearch() {
        const $input = searchContainer.querySelector("input");
        const $button = searchContainer.querySelector("button");
        const realFn = function ($input) {
            const inputContent = $input.value;
            getTweets(inputContent).then(function (tweets) {
                flushTweets();
                tweets.forEach(populateSingleTweet);
            });
        };
        const debouncedFn = debounceFn(realFn, $input);
        $input.addEventListener("input", function () {
            debouncedFn($input);
        });
    }

    initializeSearch();
})();