'use strict'
/**
 * 設定取得モジュール
 * @constructor
 */
class ConfigModule {

    constructor(config) {
        this.config = config
    }

    /**
     * 個別設定取得
     * @param {string}} key
     * @param {any} defaultValue
     */
    get(key, defaultValue = null) {
        if (key in this.config) {
            return this.config[key]
        } else {
            return defaultValue
        }
    }

    /**
     * 全設定取得
     */
    getAll() {
        return this.config
    }
}

module.exports = ConfigModule