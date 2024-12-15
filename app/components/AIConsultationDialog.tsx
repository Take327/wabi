import { useState } from "react";

type AIConsultationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inputs: string[]) => void;
};

export default function AIConsultationDialog({
  isOpen,
  onClose,
  onSubmit,
}: AIConsultationDialogProps) {
  const [inputs, setInputs] = useState<string[]>(["", "", ""]);

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleSubmit = () => {
    onSubmit(inputs.filter((input) => input.trim() !== ""));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">AI相談用ダイアログ</h2>
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
          テキストボックスを追加
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
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}
