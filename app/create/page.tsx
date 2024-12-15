'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateMessage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // APIエンドポイントにメッセージを送信
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      const { slug } = await res.json();
      router.push(`/${slug}`); // メッセージページへ遷移
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">メッセージを作成</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="ここにメッセージを入力してください"
          className="w-80 h-40 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          作成
        </button>
      </form>
    </div>
  );
}
