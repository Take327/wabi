import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // 環境変数が設定されていない場合はエラー
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { category } = req.body;

  if (!category || typeof category !== "string") {
    res.status(400).json({ error: "カテゴリが無効です。" });
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたはメッセージ作成をサポートするAIです。",
        },
        {
          role: "user",
          content: `カテゴリ「${category}」に基づいて適切な文章を生成してください。`,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const suggestion = response.choices[0]?.message?.content?.trim();

    if (!suggestion) {
      res.status(500).json({ error: "AIサポートの生成に失敗しました。" });
      return;
    }

    res.status(200).json({ suggestion });
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({
      error: "AIサポートの生成に失敗しました。",
      details: error.message || error,
    });
  }
}
