"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AIConsultationDialog from "../components/AIConsultationDialog";

export default function CreatePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [aiConsultationData, setAiConsultationData] = useState<string[]>([]);
  const [mainMessage, setMainMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // セッションストレージから状態を復元
  useEffect(() => {
    const storedMessage = sessionStorage.getItem("mainMessage");
    const storedType = sessionStorage.getItem("messageType");
    if (storedMessage) setMainMessage(storedMessage);
    if (storedType) setMessageType(storedType);
  }, []);

  // 状態が変更されたときにセッションストレージに保存
  useEffect(() => {
    sessionStorage.setItem("mainMessage", mainMessage);
    sessionStorage.setItem("messageType", messageType);
  }, [mainMessage, messageType]);

  const handleDialogSubmit = (inputs: string[]) => {
    setAiConsultationData(inputs);
  };

  const handleSubmitMessage = () => {
    if (!messageType) {
      setError("メッセージの種類を選択してください。");
      return;
    }

    if (!mainMessage.trim()) {
      setError("メインのメッセージを入力してください。");
      return;
    }

    if (mainMessage.length > 500) {
      setError("メッセージは500文字以内で入力してください。");
      return;
    }

    setError("");

    // プレビュー画面に遷移
    router.push(`/preview`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        あなたの想いを言葉にしましょう
      </h1>

      {/* セレクトボックス */}
      <div className="mb-4">
        <label htmlFor="messageType" className="block text-gray-700 mb-2">
          メッセージの種類を選択してください:
        </label>
        <select
          id="messageType"
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
        >
          <option value="">選択してください</option>
          <option value="謝罪">謝罪</option>
          <option value="別れの言葉">別れの言葉</option>
          <option value="お悔やみ">お悔やみ</option>
          <option value="反省">反省</option>
          <option value="お詫び">お詫び</option>
          <option value="後悔">後悔</option>
          <option value="忠告">忠告</option>
          <option value="内省">内省</option>
          <option value="謝意">謝意</option>
          <option value="退職の挨拶">退職の挨拶</option>
          <option value="退任の挨拶">退任の挨拶</option>
        </select>
      </div>

      {/* メインのメッセージ入力項目 */}
      <textarea
        value={mainMessage}
        maxLength={500}
        onChange={(e) => setMainMessage(e.target.value)}
        placeholder="ここにメインのメッセージを入力してください"
        className="w-full max-w-md h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
      />

      {error && (
        <div className="text-red-600 text-sm text-center mb-4">{error}</div>
      )}

      <button
        onClick={() => setIsDialogOpen(true)}
        className="px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition mb-6"
      >
        AIサポートを利用する
      </button>
      <button
        onClick={handleSubmitMessage}
        className="px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition"
      >
        メッセージを確認する
      </button>

      {/* AI相談用ダイアログ */}
      <AIConsultationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDialogSubmit}
      />

      {/* デバッグ用にデータを表示 */}
      {aiConsultationData.length > 0 && (
        <div className="mt-6 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold mb-2">送信されたデータ:</h2>
          <ul className="list-disc list-inside space-y-1">
            {aiConsultationData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
