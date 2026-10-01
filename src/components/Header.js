"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname(); // 예: "/analysis"

    return (
        <header className="header">
            <Link className="logo" href="/">
                GapFinder
            </Link>
            <nav className="header-menu" aria-label="주요 메뉴">
                <Link
                    href="/jobs"
                    className={pathname === "/jobs" ? "active" : ""}
                    aria-current={pathname === "/jobs" ? "page" : undefined}
                >
                    <span className="step">1</span>공고 모으기
                </Link>

                <Link
                    href="/analysis"
                    className={pathname === "/analysis" ? "active" : ""}
                    aria-current={pathname === "/analysis" ? "page" : undefined}
                >
                    <span className="step">2</span>갭 분석
                </Link>
            </nav>
        </header>
    );
}
