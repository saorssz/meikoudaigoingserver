# 名工大Going! Server

This project is node.ts project for Meikoudai Going.

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
    usercontroller.ts
    monstercontroller.ts // 未生成
  DB/
    entities/
      userInfo.ts
      monsterInfo.ts // 未生成
      monsterKind.ts // 未生成
      getMonster.ts // 未生成
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