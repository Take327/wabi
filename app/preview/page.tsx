"use client";

import { useSearchParams } from "next/navigation";
import MessageCard from "../components/MessageCard";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "メッセージがありません。";

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        送信する想いを確認してください
      </h1>
      <MessageCard message={message} />
      <button
        onClick={() => alert("メッセージが確定されました！")}
        className="mt-6 px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition"
      >
        メッセージを確定する
      </button>
    </div>
  );
}
