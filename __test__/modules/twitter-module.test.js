'use strict'
jest.mock('../../modules/config-module')
jest.mock('../../modules/twitter-module')
const functions = require('firebase-functions')
const cache = require('memory-cache')
const Twitter = require('twitter')
const TwitterModule = require('../../modules/twitter-module')
const ConfigModule = require('../../modules/config-module')
const config = new ConfigModule(functions.config())
const twitterConf = config.get('twitter')
const twitter = new TwitterModule(new Twitter(twitterConf.credential), cache, twitterConf.fav_list)

describe('twiiter.js', () => {

    test('Twitter API のクレデンシャルがセットされていること', () => {
        expect(twitterConf.credential.consumer_key).not.toBeNull()
        expect(twitterConf.credential.consumer_secret).not.toBeNull()
        expect(twitterConf.credential.access_token_key).not.toBeNull()
        expect(twitterConf.credential.access_token_secret).not.toBeNull()
    })

    test('お気に入り Tweet 取得設定がセットされていること', () => {
        expect(twitterConf.fav_list.screen_name).not.toBeNull()
        expect(twitterConf.fav_list.count_limit).not.toBeNull()
    })

    test('お気に入り Tweet リストが取得できること', done => {
        twitter.getFavList(twitterConf, (tweets, error) => {
            expect(error).toBeFalsy()
            expect(tweets.length).toBeGreaterThan(0)
            done()
        })
    })

})