import './globals.css';

export const metadata = {
  title: '방화벽 로그 모니터링',
  description: '방화벽 로그 모니터링 웹 어드민',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-dark-bg text-gray-200 antialiased">
        {children}
      </body>
    </html>
  );
}
