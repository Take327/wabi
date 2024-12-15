"use client";

import { useEffect, useState } from "react";

export default function ConfirmedPage() {
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // メッセージタイプと内容を復元
    const messageType = sessionStorage.getItem("messageType");
    const mainMessage = sessionStorage.getItem("mainMessage");

    if (messageType && mainMessage) {
      const longUrl = `${window.location.origin}/receive?type=${encodeURIComponent(messageType)}&message=${encodeURIComponent(mainMessage)}`;
      generateShortUrl(longUrl);
    } else {
      setError("メッセージが見つかりません。作成画面に戻ってください。");
    }
  }, []);

  const generateShortUrl = async (longUrl: string) => {
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original_url: longUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.short_url);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "短縮URLの生成に失敗しました。");
      }
    } catch (error) {
      console.error("短縮URL生成エラー:", error);
      setError("短縮URLの生成中にエラーが発生しました。");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        短縮URLが生成されました
      </h1>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : shortUrl ? (
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-800 mb-4">以下のURLを受信者に送信してください:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">
            {shortUrl}
          </a>
        </div>
      ) : (
        <p className="text-gray-600">URLを生成しています...</p>
      )}
    </div>
  );
}
