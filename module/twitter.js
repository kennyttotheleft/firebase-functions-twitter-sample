/**
 * Twitter for Node.js
 * @link https://www.npmjs.com/package/twitter
 */
const Twitter = require('twitter')
/**
 * A simple in-memory cache for node.js
 * @link https://www.npmjs.com/package/memory-cache
 */
const cache = require('memory-cache')
const twitterCredential = require('../config/twitter-credential.json')
const client = new Twitter(twitterCredential)

/**
 * 対象 Twitter ユーザーの いいね したツイートリスト取得
 * @link https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list
 * @param {Object} options - ツイート取得オプション
 * @param {callback} callback
 * @example
 * options = {
 *  screen_name: string - 対象ユーザーのスクリーンネーム
 *  count: int - ツイート取得数
 *  since_id: int - 指定されたツイート ID 以降のツイートを取得
 * }
 */
function getFavList(options, callback) {
    const durationSec = 60
    const apiPath = 'favorites/list'
    const tweets = cache.get(apiPath)
    if (tweets) {
        callback(tweets, false)
    } else {
        if (!options) options = {}
        client.get(apiPath, options, (error, tweets, response) => {
            if (tweets) {
                cache.put(apiPath, tweets, durationSec * 1000)
            }
            callback(tweets, error)
        });
    }
}
module.exports = {
    getFavList: getFavList
}