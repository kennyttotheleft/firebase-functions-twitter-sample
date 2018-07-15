'use strict'
const testConf = require('../../modules/__mocks__/__data__/config-mock-data.json')
const ConfigModule = require('../../modules/config-module')
const config = new ConfigModule(testConf)

describe('config-module', () => {

    test('全ての設定が取得できること', () => {
        expect(testConf).not.toBeNull()
        expect(config.getAll()).toEqual(testConf)
    })

    test('Twetter 設定が取得できること', () => {
        expect(config.get('twitter')).toEqual(testConf.twitter)
    })

    test('キーに対応する値がない場合は null が取得できること', () => {
        expect(config.get('foo')).toBeNull()
    })

})