## 依存関係インストール

```bash
yarn
```

## 開発時やること

- firestore エミュレーターの起動
- localhost:3000 に外部からアクセスできるよう ngrok でポートフォワード
- 開発サーバーを localhost:3000 で起動

## ngrok でポートフォワード

```bash
yarn bot:webhook
```

開発時は、ボットへのメッセージでトリガーされる webhook イベントを、ローカルで起動したサーバーで待ち受けられるよう、ngrok というツールで一時的にローカルサーバーを外部ネットワークからアクセスできる状態にします。


### やっていること

- localhost:3000 をポートフォワード
- 払い出された外部からアクセス可能な url を line bot の webhook 先に指定
- `.env.local`の`MOSSY_DOMAIN`を払い出された URL に書き換え

## 開発用サーバーの起動

```bash
yarn dev
```

サーバーは以下 2 点を行います。

1. line bot の webhook 待ち受け(/api/bot)
2. ポジティブツリーへのリクエスト待ち受け(/tree/{各グループのグループ ID})

## デプロイ

github の master ブランチへの push で vercel にデプロイされます。

### ref
https://leerob.io/blog/vercel-env-variables-size-limit
