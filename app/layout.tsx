import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "智能衣橱 - AI穿搭助手",
  description: "基于天气、场合和语音指令的智能穿搭推荐应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}