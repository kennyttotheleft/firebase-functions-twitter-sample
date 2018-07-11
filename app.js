/**
 * @class app
 * HTTP リクエスト経由で関数を呼び出す
 * @link https://firebase.google.com/docs/functions/http-events?hl=ja
 */
class App {
  constructor(options) {
    const config = options.config
    const compression = options.compression
    const cors = options.cors
    const url = options.url
    const express = options.express
    const cache = options.cache
    const TwitterClient = options.TwitterClient
    const TwitterModule = options.TwitterModule
    const settings = options.settings
    const twitterModule = new TwitterModule({
      clinet: new TwitterClient({
        consumer_key: config.credential.twitter.consumer_key,
        consumer_secret: config.credential.twitter.consumer_secret,
        access_token_key: config.credential.twitter.access_token_key,
        access_token_secret: config.credential.twitter.access_token_secret
      }),
      cache: cache
    })

    const app = express()
    app.use(compression())
    app.use(cors({
      origin: true
    }))

    app.get('/topics', (request, response) => {
      let options = {}
      if ('FAVOLITE_TWEET_LIST_OPTIONS' in settings) {
        options = settings.FAVOLITE_TWEET_LIST_OPTIONS
      }
      const urlInfo = url.parse(request.url, true)
      if (urlInfo.query.since_id) {
        options.since_id = urlInfo.query.since_id
      }

      twitterModule.getFavList(options, (result, error) => {
        if (error) {
          response.status(500).json(error)
        } else {
          /**
           *  Firebase - Cache-Control を設定する
           * @link https://firebase.google.com/docs/hosting/functions?hl=ja#set_cache_control
           */
          response
            .set('Cache-Control', 'public, max-age=300, s-maxage=600')
            .type('json')
            .status(200).json(result)
        }
      })
    })

    return app
  }
}

module.exports = App