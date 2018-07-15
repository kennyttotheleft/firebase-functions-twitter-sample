'use strict';
/**
 * ツイッターモジュールモック
 *  /modules/__mocks__/twitter-module.js
 */
class TwitterModule {
    constructor(client, cache) {
        this.client = client
        this.cache = cache
    }

    getFavList(options, callback) {
        const favList = require('./__data__/fav-list-mock-data.json')
        const error = false
        if (!'screen_name' in options ||
            !'count_limit' in options) {
            favList = false
            error = true
        }
        return callback(favList, error)
    }
}
module.exports = TwitterModule