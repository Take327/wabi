import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // 環境変数でAPIキーを管理
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inputs } = body; // フロントエンドから送信されたデータ

    if (!inputs || typeof inputs !== "string" || inputs.trim().length === 0) {
      return NextResponse.json(
        { error: "入力データが無効です。" },
        { status: 400 }
      );
    }

    // OpenAI APIリクエスト
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 使用可能なモデルを指定
      messages: [
        {
          role: "system",
          content: "あなたは手紙の文章を作成するAIアシスタントです。",
        },
        {
          role: "user",
          content: inputs, // フロントエンドから送られた文章
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const suggestion = response.choices[0]?.message?.content?.trim();
    if (!suggestion) {
      return NextResponse.json(
        { error: "AIサポートの生成に失敗しました。" },
        { status: 500 }
      );
    }

    // AIからの応答を返す
    return NextResponse.json({ suggestion });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error processing request:", errorMessage);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。", details: errorMessage },
      { status: 500 }
    );
  }
}
