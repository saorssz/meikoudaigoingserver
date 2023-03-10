# 名工大Going! Server

GPSの位置情報を利用してマップ探索を行い、モンスターを捜索・バトルするゲームアプリのAPIサーバです。(ポケモンGOのコピーアプリです)大学祭にて2日間公開し、実際にお客さんに遊んでいただきました。

### ゲーム資料

|  マップシーン  |  バトルシーン  |ビラ|
| ---- | ---- |----|
|![map scene](/img/map.png)|![battle scene](/img/battle.png)|![leaflet](/img/leaflet.png)|

- マップシーンでは、ユーザーは大学内を歩き回ってモンスターを捜索します
- バトルシーンでは、画面下部の鉛筆をフリック操作で投げ、HPを削り切ったら勝利(合格)、残り回数を使い切ったら敗北(落単)です
- ビラ下部のQRコードからインストールしてもらう形で提供しました

[Demo Movie](https://drive.google.com/file/d/1n-20mUI4NUk-hBDd7K3INyonIpm33bN5/view?usp=sharing)

## 使い方

node_modulesをインストール
`npm install`

MySQLのpasswordを変更
`src/DB/MySQL.ts`内に記述されているpasswordプロパティを変更

typescriptをjavascriptにトランスパイル
`npm run build`

serverの待ち受け
`npm start`

## ディレクトリ構造

```
src/
  controllers/
    monstercontroller.ts
    redirectController.ts
    usercontroller.ts
  DB/
    entities/
      getMonster.ts
      monsterInfo.ts
      monsterKind.ts
      userInfo.ts
    MySQL.ts
  helpers/
    extendExpress.ts
  middlewares/
    auth.ts
  routers/
    router.ts
  server.ts
secret_key/
  serviceAccountKey.json
```

### controllers/

routingによって割り振られたアクセスそれぞれに対して処理を記述
以下変更の可能性あり

- userにかかわるもの...userController.ts
- monsterにかかわるもの...monster.controller.ts

### DB/entities/

Entityの記述
テーブルの役割を果たす
以下変更の可能性あり

- 個別プレイヤーの情報...userInfo.ts
- 個別モンスターに関するもの...monsterInfo.ts
- モンスターの種類に関するもの...monsterKind.ts
- 入手したモンスターに関するもの...getMonster.ts

### helpers/

置き場に困ったものを置いた

- ミドルウェア間で値を受け渡したかったためRequestクラスを拡張...extendExpress

### middlewares/

個別の処理を行う前に挟む処理を記述

- firebaseの認証にかかわるもの...auth.ts

### routers/

routingの処理を記述
