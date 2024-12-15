"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MessageCard from "../components/MessageCard";

export default function PreviewPage() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const router = useRouter();

  // セッションストレージから状態を復元
  useEffect(() => {
    const storedMessage = sessionStorage.getItem("mainMessage");
    const storedType = sessionStorage.getItem("messageType");
    if (storedMessage) setMessage(storedMessage);
    if (storedType) setMessageType(storedType);
  }, []);

  const handleConfirm = () => {
    router.push("/confirmed");
  };

  const handleGoBack = () => {
    router.push("/create");
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        送信する想いを確認してください
      </h1>

      {/* メッセージ内容 */}
        <MessageCard messageType={messageType} message={message} />

      {/* ボタン */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition"
        >
          戻る
        </button>
        <button
          onClick={handleConfirm}
          className="px-6 py-3 bg-black text-white rounded shadow hover:bg-gray-800 transition"
        >
          確定する
        </button>
      </div>
    </div>
  );
}
