/**
 * Firebase SDK for Cloud Functions
 * @link https://www.npmjs.com/package/firebase-functions
 */
const functions = require('firebase-functions')
/**
 * Node.js compression middleware
 * @link https://www.npmjs.com/package/compression
 */
const compression = require('compression')()
/**
 * Node.js CORS middleware
 * @link https://www.npmjs.com/package/cors
 */
const cors = require('cors')({
    origin: true
})

/**
 * Application settings
 */
const settings = require('./config/settings.json')

const config = functions.config()


// [START Topics API trigger]
/**
 * Topics API trigger
 * HTTP リクエスト経由で関数を呼び出す
 * @link https://firebase.google.com/docs/functions/http-events?hl=ja
 */
exports.topics = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        compression(request, response, () => {
            /**
             * Twitter for Node.js
             * @link https://www.npmjs.com/package/twitter
             */
            const TwitterClient = require('twitter')
            /**
             * Twitter Module
             */
            const TwitterModule = require('./modules/twitter-module')
            /**
             * A simple in-memory cache for node.js
             * @link https://www.npmjs.com/package/memory-cache
             */
            const cache = require('memory-cache')

            const twitterModule = new TwitterModule({
                client: new TwitterClient({
                    consumer_key: config.credential.twitter.consumer_key,
                    consumer_secret: config.credential.twitter.consumer_secret,
                    access_token_key: config.credential.twitter.access_token_key,
                    access_token_secret: config.credential.twitter.access_token_secret
                }),
                cache: cache,
                settings: settings.twitter
            })

            let options = {}
            if ('since_id' in request && request.since_id) {
                options.since_id = request.since_id
            }
            if ('count' in request && request.count) {
                options.count = request.count
            }

            twitterModule.getFavList(options, (result, error) => {
                if (error) {
                    response.status(500).json(error)
                } else {
                    /**
                     *  Firebase - Cache-Control を設定する
                     * @link https://firebase.google.com/docs/hosting/functions?hl=ja#set_cache_control
                     */
                    response
                        .set('Cache-Control', 'public, max-age=300, s-maxage=600')
                        .type('json')
                        .status(200).json(result)
                }
            })
        })
    })
})
// [END Topics API trigger]