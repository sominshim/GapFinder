import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "GapFinder",
  description: "채용 공고에서 부족한 기술을 찾아 무엇부터 공부할지 알려주는 서비스",
};

export default function RootLayout({ children }) {
  // 할 일: 메뉴바 누르면 class active 설정 pathname
  return (
    <html lang="ko">
      <body>
        <header className="header">
          <Link className="logo" href="/">GapFinder</Link>
          <nav className="header-menu" aria-label="주요 메뉴">
            <Link className="active" href="/jobs">
              <span className="step">1</span>채용공고
            </Link>
            <Link href="/analysis">
              <span className="step">2</span>갭 분석
            </Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
