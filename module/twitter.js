const Twitter = require('twitter');
const twitterCredential = require('../config/twitter-credential.json')
const client = new Twitter(twitterCredential);

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
    console.log('getFavList', options);
    if (!options) options = {}
    client.get('favorites/list', options, (error, tweets, response) => {
        callback(tweets, error)
    });
}

module.exports = {
    getFavList: getFavList
}