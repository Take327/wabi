import { Pool } from "pg";

// ElephantSQL の接続情報
const pool = new Pool({
  user: process.env.PG_USER,        // PostgreSQL ユーザー名
  host: process.env.PG_HOST,        // PostgreSQL ホスト名
  database: process.env.PG_DATABASE, // データベース名
  password: process.env.PG_PASSWORD, // パスワード
  port: parseInt(process.env.PG_PORT || "5432"), // ポート番号（デフォルト: 5432）
  ssl: {
    rejectUnauthorized: false, // ElephantSQL では SSL が必須
  },
});

export { pool };
