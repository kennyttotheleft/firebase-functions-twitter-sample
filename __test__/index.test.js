'use strict'
jest.mock('../modules/twitter-module')
const apiFunctions = require('../index');

describe('Cloud Functions', () => {
    // [START Topics API trigger]
    describe('topics', () => {
        beforeAll(() => {});

        afterAll(() => {});

        test('トピックリストが JSON 形式で取得できること', (done) => {
            // [START assertHTTP]
            // A fake request object, with req.query.text set to 'input'
            const request = {
                headers: {
                    origin: '*'
                },
                count: 11,
                since_id: 1
            }

            // A fake response object, with a stubbed redirect function which asserts that it is called
            const response = {
                setHeader() {}, // Needed for cors middleware
                getHeader() {}, // Needed for cors middleware
                set: (key, value) => {
                    expect(key).toBe('Cache-Control')
                    expect(value).toBe('public, max-age=300, s-maxage=600')
                    return {
                        type: (type) => {
                            expect(type).toBe('json')
                            return {
                                status: (code) => {
                                    expect(code).toBe(200)
                                    return {
                                        json: (data) => {
                                            expect(data.length).toBeGreaterThan(0)
                                            done()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // [END assertHTTP]

            // Invoke addMessage with our fake request and response objects. This will cause the
            // assertions in the response object to be evaluated.
            apiFunctions.topics(request, response)
        })
    })
    // [END Topics API trigger]

})