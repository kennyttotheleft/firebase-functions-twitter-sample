const functions = require('firebase-functions')
const App = require('./app')
const app = new App({
    /**
     * Firebase SDK for Cloud Functions
     * @link https://www.npmjs.com/package/firebase-functions
     */
    config: functions.config(),
    /**
     * Node.js compression middleware
     * @link https://www.npmjs.com/package/compression
     */
    compression: require('compression'),
    /**
     * Node.js CORS middleware
     * @link https://www.npmjs.com/package/cors
     */
    cors: require('cors'),
    /**
     * The core `url` packaged standalone for use with Browserify.
     * @link https://www.npmjs.com/package/url
     */
    url: require('url'),
    /**
     * Fast, unopinionated, minimalist web framework
     * @link https://www.npmjs.com/package/express
     */
    express: require('express'),
    /**
     * A simple in-memory cache for node.js
     * @link https://www.npmjs.com/package/memory-cache
     */
    cache: require('memory-cache'),
    /**
     * Twitter for Node.js
     * @link https://www.npmjs.com/package/twitter
     */
    TwitterClient: require('twitter'),
    TwitterModule: require('./modules/twitter'),
    settings: require('./config/settings.json')
})
exports.api = functions.https.onRequest(app)