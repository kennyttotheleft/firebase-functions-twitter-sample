/**
 * How to test Express.js with Jest and Supertest
 * @link http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
 *
 * Node + Express のルーターをテストする
 * @link http://mid0111.hatenablog.com/entry/2015/08/23/211901
 */
'use strict'
jest.mock('../modules/twitter')

const request = require('supertest')
const functions = require('firebase-functions')
const App = require('../app')
const app = new App({
    config: functions.config(),
    compression: require('compression'),
    cors: require('cors'),
    url: require('url'),
    express: require('express'),
    cache: require('memory-cache'),
    TwitterClient: require('twitter'),
    TwitterModule: require('../modules/twitter'),
    settings: require('../config/settings.json')
})
const agent = request.agent(app)

describe('GET /topics', () => {
    test('トピックリストが JSON 形式で取得できること', (done) => {
        agent.get('/topics').end((error, response) => {
            expect(error).toBeFalsy()
            expect(response.statusCode).toBe(200)
            expect(response.header['content-type']).toBe('application/json; charset=utf-8')
            expect(response.body.length).toBeGreaterThan(0)
            done()
        })
    });
})