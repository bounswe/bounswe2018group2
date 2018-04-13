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
def searchKey(keyname, limit, showuser):
    tweetlist = tweepy.Cursor(api.search, q='#' + keyname, show_user = showuser,result_type='popular', lang = 'tr').items(limit)
    for tweet in tweetlist:
        print json.dumps(tweet._json)
        

def getUser(username):
    user = api.get_user(username)

    print user.screen_name
    print user.followers_count
    for friend in user.friends():
       print friend.screen_name

def getTimeline():
    public_tweets = api.home_timeline()
    for tweet in public_tweets:
   	    print tweet.text




# send direct message to bartu
# post tweet