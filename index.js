/**
 * Firebase SDK for Cloud Functions
 * @link https://www.npmjs.com/package/firebase-functions
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
/**
 * A simple in-memory cache for node.js
 * @link https://www.npmjs.com/package/memory-cache
 */
const cache = require('memory-cache')
/**
 * Twitter for Node.js
 * @link https://www.npmjs.com/package/twitter
 */
const TwitterClient = require('twitter')
/**
 * Twitter Module
 */
const TwitterModule = require('./modules/twitter')
/**
 * Application settings
 */
const settings = require('./config/settings.json')
/**
 * Application class
 */
const App = require('./app')
/**
 * HTTP リクエスト経由で関数を呼び出す
 * @link https://firebase.google.com/docs/functions/http-events?hl=ja
 */
exports.api = functions.https.onRequest(new App({
    config: functions.config(),
    compression: compression,
    cors: cors,
    url: url,
    express: express,
    cache: cache,
    TwitterClient: TwitterClient,
    TwitterModule: TwitterModule,
    settings: settings
}))