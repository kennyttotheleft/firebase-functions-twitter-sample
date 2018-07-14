'use strict'
/**
 * Twitter API 呼び出しミドルウェア
 * @constructor
 */
class TwitterModule {

    constructor(options) {
        this.client = options.client
        this.cache = options.cache
        this.settings = options.settings
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
            let requestParams = {}
            let defaultOptions = false
            if ('favorite_tweet_list' in this.settings) {
                defaultOptions = this.settings.favorite_tweet_list
                if('screen_name' in defaultOptions) {
                    requestParams.screen_name = defaultOptions.screen_name
                }
                if('count_limit' in defaultOptions) {
                    requestParams.count = defaultOptions.count_limit
                }
            }

            if (options) {
                if ('count' in options && 'count_limit' in defaultOptions) {
                    if (defaultOptions.count_limit > options.count) {
                        requestParams.count = options.count
                    }
                }

                if('since_id' in options) {
                    requestParams.since_id = options.since_id
                }
            }
            this.client.get(apiPath, requestParams, (error, tweets, response) => {
                if (tweets) {
                    self.cache.put(apiPath, tweets, cacheLifeTimeSec * 1000)
                }
                return callback(tweets, error)
            })
        }
    }
}

module.exports = TwitterModule