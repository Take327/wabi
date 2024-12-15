import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'WABI',
  description: '想いを静かに伝えるサービス',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        {/* ヘッダー */}
        <header className="w-full bg-black text-white py-4 text-center">
          <Link href="/" className="text-2xl font-bold">
            WABI
          </Link>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-grow bg-gray-100 text-gray-700">{children}</main>

        {/* フッター */}
        <footer className="w-full bg-gray-800 text-gray-300 py-4 text-center">
          <p className="text-sm">&copy; 2024 Takahashi Takeshi. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
