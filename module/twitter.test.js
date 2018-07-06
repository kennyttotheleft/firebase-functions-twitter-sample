const twitter = require('./twitter')
const twitterCredential = require('../config/twitter-credential.json')
const settings = require('../config/settings.json')

test('credentials are set for retrieving tweets', () => {
    expect(twitterCredential.consumer_key).not.toBeNull()
    expect(twitterCredential.consumer_secret).not.toBeNull()
    expect(twitterCredential.access_token_key).not.toBeNull()
    expect(twitterCredential.access_token_secret).not.toBeNull()
});

test('settings are set for retrieving tweets', () => {
    expect(settings.FAVOLITE_TWEET_LIST_OPTIONS.screen_name).not.toBeNull()
});

test('get favolite tweet list without options', done => {
    twitter.getFavList(false, (tweets, error) => {
        expect(error).toBeNull()
        expect(tweets.length).toBeGreaterThan(0)
        done();
    });
});

test('get favolite tweet list with options', done => {
    const options = settings.FAVOLITE_TWEET_LIST_OPTIONS
    twitter.getFavList(options, (tweets, error) => {
        expect(error).toBeNull()
        expect(tweets.length).toBeGreaterThan(0)
        done();
    });
});
