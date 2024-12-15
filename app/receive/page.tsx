"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MessageCard from "../components/MessageCard";
import Link from "next/link";
import FireAnimation from "../components/FireAnimation";

export default function ReceivePage() {
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [isBurning, setIsBurning] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // URLパラメータからデータを復元
    const type = searchParams.get("type");
    const message = searchParams.get("message");
    if (type && message) {
      setMessageType(decodeURIComponent(type));
      setMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  const handleBurn = () => {
    setIsBurning(true);
    setTimeout(() => {
      setMessageType("");
      setMessage("");
    }, 3000); // アニメーションの終了タイミングに合わせてメッセージを消去
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gray-100">
      <header className="w-full bg-gray-800 text-white p-4 text-center mb-6">
        <Link href="/" legacyBehavior>
          <a className="text-white text-lg font-semibold hover:underline">トップページに戻る</a>
        </Link>
      </header>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        受け取ったメッセージ
      </h1>

      <div className="bg-white shadow rounded p-6 mb-6 text-center max-w-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">WABIについて</h2>
        <p className="text-gray-600">
          WABIは、人前では伝えきれない思いを静かに伝えるためのサービスです。<br />
          謝罪、別れの言葉、お悔やみのメッセージなど、大切な気持ちを言葉にして相手に届けることができます。
        </p>
      </div>
      <FireAnimation />

      {message && messageType ? (
        <div className={`relative ${isBurning ? "burn-effect" : ""}`}>
          <MessageCard messageType={messageType} message={message} />
          <button
            onClick={handleBurn}
            className="mt-4 px-6 py-3 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
          >
            燃やす
          </button>
        </div>
      ) : (
        <p className="text-gray-600">メッセージが見つかりません。</p>
      )}

      <style jsx>{`
        @keyframes burnEffect {
          0% {
            opacity: 1;
            transform: scale(1);
            background: rgba(255, 69, 0, 0.8);
          }
          25% {
            background: rgba(255, 140, 0, 0.7);
          }
          50% {
            background: rgba(255, 69, 0, 0.6);
          }
          75% {
            background: rgba(255, 0, 0, 0.5);
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: scale(0);
            background: transparent;
          }
        }

        .burn-effect {
          animation: burnEffect 3s forwards;
          position: relative;
          z-index: 1;
          overflow: hidden;
          background: rgba(255, 69, 0, 0.8);
          border: 1px solid #ff4500;
          box-shadow: 0 0 30px rgba(255, 69, 0, 0.9);
        }
      `}</style>
    </div>
  );
}
