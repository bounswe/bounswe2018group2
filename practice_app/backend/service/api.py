# coding=utf-8
import tweepy
import json

CONSUMER_KEY = 'ap098bfXtZf85ZJzRMFkOnOBk'
CONSUMER_SECRET = 'at1a9RHBCeuT1JwgcesbjrjkVfArgR9Ppd1k1MVPgIkJp0I0lL'

ACCESS_TOKEN = '984138897738395651-oZ87NzAqGNUyFP7IzMQ8WanKFe0whdl'
ACCESS_TOKEN_SECRET = 'x0Jh7NhFI2d35fTqM8WZLmsWKHSACuVkKGdAjMqN0WuO1'

auth = tweepy.OAuthHandler( CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

api = tweepy.API(auth)

# get tweets
def searchKey(keyname, limit = 5):
    result = []
    tweetlist = tweepy.Cursor(api.search, q=keyname, show_user = True,result_type='popular', lang = 'tr').items(limit)
    for tweet in tweetlist:
        result.append(tweet._json)
    return json.dumps(result);

def getUser(username):
    user = api.get_user(username)

    print user.screen_name
    print user.followers_count
    for friend in user.friends():
       print friend.screen_name

def getSelfTweets(count = 10):
    result = []
    userTL = tweepy.Cursor(api.user_timeline, count = count).items(count)
    for t in userTL:
        result.append(t._json)
    return json.dumps(result)

def getTimeline():
    public_tweets = api.home_timeline()
    for tweet in public_tweets:
        print tweet.text

def sendDirectMessage(name, content):
    api.send_direct_message(screen_name = name, text = content);

def postTweet(sts):
    api.update_status(sts)

#x = searchKey("BESIKTAS", 5);
#print x
#with open("merged_file.json", "wb") as outfile:
#    outfile.write(x)

# User ID of ZipperQR (that's me!) : 4170632968
#sendDirectMessage("ZipperQR", "I'm baaaaack!");

#x = getSelfTweets(5);
#print x
#with open("merged_file.json", "wb") as outfile:
#    outfile.write(x)

# send direct message to bartu : DONE
# post tweet