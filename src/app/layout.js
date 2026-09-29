import "./globals.css";

export const metadata = {
  title: "GapFinder",
  description: "채용 공고에서 부족한 기술을 찾아 무엇부터 공부할지 알려주는 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kor">
      <body>{children}</body>
    </html>
  );
}
