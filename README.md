[![Build Status](https://travis-ci.org/tanakaoriginal/firebase-functions-twitter-sample.svg?branch=master)](https://travis-ci.org/tanakaoriginal/firebase-functions-twitter-sample)

# firebase-functions-twitter-sample
Firebase の Cloud Functions で Twitter API と連携するサンプルです。
特定のスクリーンネームのユーザーがお気にいりしたツイートリストを取得します。

## Project Setup

1. Firebase Tools のインストール

```
$ npm install -g firebase-tools
```

> もしうまくいかない時は、[npm パーミッションの変更](https://docs.npmjs.com/getting-started/fixing-npm-permissions) を試してみてください。

2. Firebase コンソールでプロジェクトを作成

[Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成します。

3. Firebase プロジェクトの料金プランを有料プランに変更

Cloud Functions から外部 API へアクセスするため、このプロジェクトの料金プランを `Flame` または `Blaze` に設定する必要があります。

無料プランの `Spark` の場合は、デプロイ後に外部サイトへアクセスできないエラーが API レスポンスとして返却されます。

参考：[Firebase の料金体系](https://firebase.google.com/pricing/)

4. リポジトリをクローン

このリポジトリをクローンもしくはダウンロードします。

```
$ git clone https://github.com/tanakaoriginal/firebase-functions-twitter-sample.git
$ cd firebase-functions-twitter-sample
```

5. Firebase CLI で使用するプロジェクトを選択

以下のコマンドで Firebase コンソールで使用したプロジェクトを選択します。

```
$ firebase use --add
```

6. Firebase プロジェクトの環境変数を設定

Twitter API のクレデンシャルを [Twitter Application Management](https://apps.twitter.com/) から取得して設定します。

```
$ firebase functions:config:set \
twitter.credential.consumer_key="YOUR_CONSUMER_KEY" \
twitter.credential.consumer_secret="YOUR_CONSUMER_SECRET" \
twitter.credential.access_token_key="YOUR_ACCESS_TOKEY_KEY" \
twitter.credential.access_token_secret="YOUR_ACCESS_TOKEY_SECRET"
```

Tweet 取得用の設定も追加します。

```
$ firebase functions:config:set \
twitter.fav_list.screen_name="noradio" \
twitter.fav_list.count_limit=10
```

7. 依存関係のインストール

```
$ npm install
```

8.  ローカル環境で API 動作を確認

下記コマンド実行後に確認ようの API エンドポイント URL が表示されます。

```
$ npm serve
```

9.  Cloud Functions で API 動作を確認

ローカルテストと同様にコマンド実行後に確認用の URL が表示されます。

```
$ npm deploy
```

## 自動テスト

### ユニットテスト

下記コマンドを functions ディレクトリで実行します。

```
$ npm test
```

モックされている処理

* Twitter API リクエスト処理（APIへのリクエストは行わずにテスト用の Tweet リストが返されます）
* Firebase の環境設定（仮の設定値で処理が実行されます）

### 受け入れテスト

TODO

