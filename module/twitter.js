/**
 * @classdesc Twitter API 呼び出しミドルウェア
 * @constructor
 */
class TwitterModule {
    constructor(setting) {
        /**
         * Twitter for Node.js
         * @link https://www.npmjs.com/package/twitter
         */
        const Twitter = require('twitter')
        this.client = new Twitter(setting.credential)
        /**
         * A simple in-memory cache for node.js
         * @link https://www.npmjs.com/package/memory-cache
         */
        this.cache = require('memory-cache')
    }

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
    getFavList(options, callback) {
        const cacheLifeTimeSec = 60 // 1 min
        const apiPath = 'favorites/list'
        const tweets = this.cache.get(apiPath)
        if (tweets) {
            return callback(tweets, false)
        } else {
            const self = this;
            if (!options) options = {}
            this.client.get(apiPath, options, (error, tweets, response) => {
                if (tweets) {
                    self.cache.put(apiPath, tweets, cacheLifeTimeSec * 1000)
                }
                callback(tweets, error)
            })
        }
    }
}
module.exports = TwitterModule;