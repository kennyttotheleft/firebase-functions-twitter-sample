// __mocks__/twitter.js
'use strict';
class TwitterModule {
    constructor(options) {}

    getFavList(options, callback) {
        const favList = require('./favListData.json')
        const error = false
        return callback(favList, error)
    }
}
module.exports = TwitterModule