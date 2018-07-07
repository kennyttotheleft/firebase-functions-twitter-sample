/**
 * HTTP リクエスト経由で関数を呼び出す
 * @link https://firebase.google.com/docs/functions/http-events?hl=ja
 */
const functions = require('firebase-functions')
/**
 * Node.js compression middleware
 * @link https://www.npmjs.com/package/compression
 */
const compression = require('compression')
/**
 * Node.js CORS middleware
 * @link https://www.npmjs.com/package/cors
 */
const cors = require('cors')
/**
 * The core `url` packaged standalone for use with Browserify.
 * @link https://www.npmjs.com/package/url
 */
const url = require('url')
/**
 * Fast, unopinionated, minimalist web framework
 * @link https://www.npmjs.com/package/express
 */
const express = require('express')
const settings = require('./config/settings.json')
const twitter = require('./module/twitter')
const app = express()

app.use(compression())
app.use(cors({
  origin: true
}))
app.get('/favoliteList', (request, response) => {
  let options = {}
  if ('FAVOLITE_TWEET_LIST_OPTIONS' in settings) {
    options = settings.FAVOLITE_TWEET_LIST_OPTIONS
  }
  const urlInfo = url.parse(request.url, true)
  if (urlInfo.query.since_id) {
    options.since_id = urlInfo.query.since_id
  }
  twitter.getFavList(options, (result, error) => {
    if (error) {
      response.status(500).json(error)
    } else {
      /**
       *  Firebase - Cache-Control を設定する
       * @link https://firebase.google.com/docs/hosting/functions?hl=ja#set_cache_control
       */
      response
        .set('Cache-Control', 'public, max-age=300, s-maxage=600')
        .status(200).json(result)
    }
  })
})
exports.api = functions.https.onRequest(app)