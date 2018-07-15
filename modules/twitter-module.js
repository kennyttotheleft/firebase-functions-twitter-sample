'use strict'
/**
 * Twitter データ処理モジュール
 * @constructor
 */
class TwitterModule {

    /**
     *
     * @param {TwitterClient} client Twitter API リクエスト用クライアントインスタンス
     * @param {memory-cache} cache キャッシュ用インスタンス（memory-cache）
     */
    constructor(client, cache, settings) {
        this.client = client
        this.cache = cache
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
            if ('screen_name' in options) {
                requestParams.screen_name = options.screen_name
            }
            if ('count_limit' in options) {
                requestParams.count = options.count_limit
            }
            if ('count' in options && 'count_limit' in options) {
                if (options.count_limit > options.count) {
                    requestParams.count = options.count
                } else {
                    requestParams.count = options.count_limit
                }
            }
            if ('since_id' in options) {
                requestParams.since_id = options.since_id
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