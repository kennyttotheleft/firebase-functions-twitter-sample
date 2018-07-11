'use strict'
jest.mock('../../modules/twitter')
const settings = require('../../config/settings.json')
const functions = require('firebase-functions')
const Twitter = require('twitter')
const TwitterModule = require('../../modules/twitter')

const config = functions.config()
const twitter = new TwitterModule({
    twitterClient: new Twitter({
        consumer_key: config.credential.twitter.consumer_key,
        consumer_secret: config.credential.twitter.consumer_secret,
        access_token_key: config.credential.twitter.access_token_key,
        access_token_secret: config.credential.twitter.access_token_secret
    }),
    cache: require('memory-cache')
})

describe('twiiter.js', () => {

    test('credentials are set for retrieving tweets', () => {
        expect(config.credential.twitter.consumer_key).not.toBeNull()
        expect(config.credential.twitter.consumer_secret).not.toBeNull()
        expect(config.credential.twitter.access_token_key).not.toBeNull()
        expect(config.credential.twitter.access_token_secret).not.toBeNull()
    })

    test('settings are set for retrieving tweets', () => {
        expect(settings.FAVOLITE_TWEET_LIST_OPTIONS.screen_name).not.toBeNull()
    })

    test('get favolite tweet list without options', done => {
        twitter.getFavList(false, (tweets, error) => {
            expect(error).toBeFalsy()
            expect(error).toMatchSnapshot()
            expect(tweets).toMatchSnapshot()
            expect(tweets.length).toBeGreaterThan(0)
            done()
        })
    })

    test('get favolite tweet list with options', done => {
        const options = settings.FAVOLITE_TWEET_LIST_OPTIONS
        twitter.getFavList(options, (tweets, error) => {
            expect(error).toBeFalsy()
            expect(error).toMatchSnapshot()
            expect(tweets).toMatchSnapshot()
            expect(tweets.length).toBeGreaterThan(0)
            done()
        })
    })

})