import './globals.css';
export const metadata = {
  title: 'WABI',
  description: '思いを静かに伝えるサービス',
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
          <h1 className="text-2xl font-bold">WABI</h1>
          <p className="text-sm">思いを静かに伝えるサービス</p>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-grow bg-white text-gray-700">{children}</main>

        {/* フッター */}
        <footer className="w-full bg-gray-800 text-gray-300 py-4 text-center">
          <p className="text-sm">&copy; 2024 WABI. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
