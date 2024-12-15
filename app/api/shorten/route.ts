import { NextRequest, NextResponse } from "next/server";
import { pool } from "./db";

// ランダムな短縮キーを生成する関数
function generateRandomKey(): string {
  return Math.random().toString(36).substring(2, 8); // ランダムな6文字の英数字
}

// POSTメソッドで短縮URLを生成
export async function POST(req: NextRequest) {
  try {
    // リクエストボディからURLを取得
    const { original_url } = await req.json();

    if (!original_url) {
      return NextResponse.json(
        { error: "元のURLは必須です。" },
        { status: 400 }
      );
    }

    // 短縮キーを生成
    const shortKey = generateRandomKey();

    // データベースに挿入
    const result = await pool.query(
      "INSERT INTO urls (short_key, original_url) VALUES ($1, $2) RETURNING short_key",
      [shortKey, original_url]
    );

    const shortUrl = `${req.nextUrl.origin}/receive?key=${result.rows[0].short_key}`;

    // 短縮URLを返す
    return NextResponse.json({ short_url: shortUrl });
  } catch (error) {
    console.error("短縮URL生成エラー:", error);
    return NextResponse.json(
      { error: "短縮URLの生成中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const shortKey = searchParams.get("key");

  // 短縮キーが指定されていない場合のエラーレスポンス
  if (!shortKey) {
    return NextResponse.json(
      { error: "短縮キーが見つかりません。" },
      { status: 400 }
    );
  }

  try {
    // データベースから短縮URL情報を取得
    const query = "SELECT original_url FROM urls WHERE short_key = $1";
    const result = await pool.query(query, [shortKey]);

    // 該当するデータがない場合のエラーレスポンス
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "指定された短縮キーが無効です。" },
        { status: 404 }
      );
    }

    // original_url を解析してパラメータを取得
    const originalUrl = result.rows[0].original_url;
    const urlObj = new URL(originalUrl);

    const messageType = urlObj.searchParams.get("type") || "不明";
    const messageContent = urlObj.searchParams.get("message") || "内容がありません。";

    // レスポンスとしてメッセージデータを返す
    return NextResponse.json({
      type: messageType,
      message: messageContent,
    });
  } catch (error) {
    console.error("リダイレクト処理中のエラー:", error);

    // データベースエラーなど、予期しないエラーが発生した場合のレスポンス
    return NextResponse.json(
      { error: "リダイレクト中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}