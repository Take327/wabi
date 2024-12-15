"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MessageCard from "../components/MessageCard";
import FireAnimation from "../components/FireAnimation";
import styles from "../components/MessageCard.module.css";

export default function ReceivePage() {
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [isBurning, setIsBurning] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    // URLパラメータからデータを取得
    const shortKey = searchParams.get("key");

    if (shortKey) {
      fetchMessage(shortKey);
    } else {
      setError("URLが無効です。");
    }
  }, [searchParams]);

  const fetchMessage = async (shortKey: string) => {
    try {
      const response = await fetch(`/api/shorten?key=${shortKey}`);
      if (response.ok) {
        const data = await response.json();
        setMessageType(data.type || "未定義のメッセージタイプ");
        setMessage(data.message || "メッセージが見つかりません。");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "メッセージが見つかりません。");
      }
    } catch (error) {
      console.error("メッセージ取得エラー:", error);
      setError("メッセージを取得中にエラーが発生しました。");
    }
  };

  const handleBurn = () => {
    setIsBurning(true);
    setTimeout(() => {
      setMessageType("");
      setMessage("");
    }, 7000); // アニメーションの終了タイミングに合わせてメッセージを消去
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gray-100 relative">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">WABIについて</h2>
      <p className="text-gray-600">
        WABIは、人前では伝えきれない思いを静かに伝えるためのサービスです。
        <br />
        謝罪、別れの言葉、お悔やみのメッセージなど、大切な気持ちを言葉にして相手に届けることができます。
      </p>

      <div className="relative w-full max-w-5xl">
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {isBurning && (
          <div className="absolute flex justify-center inset-0 z-30">
            <div className={`${isBurning ? styles.fadeOut : ""}`}>
              <FireAnimation />
            </div>
          </div>
        )}
        {message && messageType ? (
          <>
            <div className={`${isBurning ? styles.fadeOut : ""}`}>
              <MessageCard messageType={messageType} message={message} />
            </div>
            <p className="text-gray-600 mt-4">
              メッセージを受け入れられない場合は「お焚き上げ」しましょう
              <br />
              ※送信者への通知などはありません。送信者に意図が伝わらないようにデータの削除も行われません。
              <br />
              あなたの中でこのアドレスを削除して開かないようにしましょう。
            </p>
            <button
              onClick={handleBurn}
              className="mt-4 px-6 py-3 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
            >
              お焚き上げ
            </button>
          </>
        ) : (
          <p className="text-gray-600">お焚き上げ</p>
        )}
      </div>
    </div>
  );
}
