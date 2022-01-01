# TypeORM に関するメモ

## primaryKey で検索するとき

primaryKey のカラム名が id のとき。

`repository.find(id)`か`repository.find({ where: {id}})`を使えば良さそう。

`repository.find(id)`は見つからなかったとき、`undefined`や`null`ではなく、対象テーブルの最初のレコードを返すので、気をつけること。

`repository.find({ where: {id}})`とすれば見つからなかったときに`undefined`を返してくれる。

どちらもエンティティの定義で id が number 型でも string 型(数字)の引数で検索できる。

参考:
[公式](https://typeorm.io/)

[.findOne(undefined) returns first item in the database instead of undefined](https://github.com/typeorm/typeorm/issues/2500)

## createConnection() は一回だけで O.K.

サーバー起動時に 1 回だけ行えばよい。DB 操作のたび行う必要はない。2 回目以降は`Already Connected`のエラーになる。

## Express で使うときの例

[typeorm/typescript-express-example](https://github.com/typeorm/typescript-express-example)

[Example using TypeORM with Express](https://github.com/typeorm/typeorm/blob/master/docs/example-with-express.md)

## Repositoryのメソッド

[公式?](https://typeorm.delightful.studio/classes/_repository_repository_.repository.html)

## TypeORMのEntityとDDDのEntityを区別する。Repositoryも区別する

- TypeORMのエンティティを `~ORMEntity` (頭文字大文字)と命名する。例: UserORMEntity

- `~ORMEntity` のインスタンスを `~Data` (頭文字小文字)と命名する。例: userData

- TypeORMのリポジトリを `テーブル名 + Table` と命名する。例: usersTable

参考: [DDDとORMのEntityを混同しないための考え方]<https://zenn.dev/seihmd/articles/0283137fcfb6a2a925d1>

## データベースの命名規則はここを参考に

<https://qiita.com/genzouw/items/35022fa96c120e67c637>

## テーブル名カラム名を指定する

デフォルトではエンティティのクラス名の頭文字を小文字にしたものがテーブル名になる。複数形にはならない。

`@Entity(テーブル名)`でテーブル名を指定できる。

[TypeORMのmigrationで作成されるテーブル名をカスタマイズする](https://qiita.com/techneconn/items/cd8b7c5a973771d46489)

##

- デフォルトでnot null



