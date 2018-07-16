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

const ConfigModule = require('./modules/config-module')
const configModule = new ConfigModule(functions.config())
const config = configModule.getAll()

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

            const twitterConf = config.twitter
            const twitterModule = new TwitterModule(
                new TwitterClient(twitterConf.credential),
                cache)

            let options = {}
            if ('since_id' in request && request.since_id) {
                options.since_id = request.since_id
            }
            if ('count' in request && request.count) {
                options.count = request.count
            }
            if('fav_list' in twitterConf) {
                const favListConf = twitterConf.fav_list
                if ('screen_name' in favListConf && favListConf.screen_name) {
                    options.screen_name = favListConf.screen_name
                }
                if ('count_limit' in favListConf && favListConf.count_limit) {
                    options.count_limit = favListConf.count_limit
                }
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