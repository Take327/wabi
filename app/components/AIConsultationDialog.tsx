import { useState } from "react";

type AIConsultationDialogProps = {
  messageType: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (response: string) => void; // AIからの応答を親に渡す
};

export default function AIConsultationDialog({
  messageType,
  isOpen,
  onClose,
  onSubmit,
}: AIConsultationDialogProps) {
  const [inputs, setInputs] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleSubmit = async () => {
    let questionText:string ="";
    const filteredInputs = inputs.join("\n");
    if (filteredInputs.length === 0) {
      setError("少なくとも1つの項目を入力してください。");
      return;
    }else{
      questionText = 
      `あなたには私の文章の作成をサポートしてもらいます。
      テーマは「${messageType}」
      以下に箇条書きに文章に込めたい想いを記載します。
      ${filteredInputs}

      あなたはテーマと想い解釈し500文字以内で文章を作成してください。
      この文章は手紙にして相手に送ります。`
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai-support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: questionText }),
      });

      if (!response.ok) {
        throw new Error("AIサポートに接続できませんでした。");
      }

      const data = await response.json();
      onSubmit(data.suggestion); // AIからの応答を親コンポーネントに渡す
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("エラーが発生しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-120">
        <h2 className="text-lg font-semibold mb-4">AI相談用</h2>
        <p className="text-gray-600 mt-4">
          AIに相談するために、あなたの想いや背景を箇条書きで書き出しましょう。
          <br />
          生成された文章をもとに、あなたの想いを言語化してみましょう。
        </p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="space-y-3">
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`項目 ${index + 1}`}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          ))}
        </div>
        <button
          onClick={addInput}
          className="mt-3 w-full px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition"
        >
          入力欄を追加
        </button>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition"
            disabled={loading}
          >
            {loading ? "送信中..." : "送信"}
          </button>
        </div>
      </div>
    </div>
  );
}
