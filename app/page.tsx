import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center px-4 py-8">
      <h2 className="text-xl font-semibold mb-6">
        人前では伝えきれない想いを伝えましょう
      </h2>

      <p className="text-gray-700 mb-8">
        謝罪、別れの言葉等をWeb上で作成し、相手にURLで届けることができます。
      </p>
      <p className="text-gray-700 mb-8">
        あなたが言葉に悩むならAIがサポートします。
      </p>
      <Link
        href="/create"
        className="px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition"
      >
        メッセージを作成する
      </Link>
    </div>
  );
}
