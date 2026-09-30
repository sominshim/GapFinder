"use client";
import JobForm from "@/components/JobForm";

import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false); // 공고 등록 폼 토글 스위치

    return (
        <>
            <main className="wrapper">
                <div className="page-head">
                    <div>
                        <h1 className="page-title">채용 공고</h1>
                        <p className="page-desc">
                            부족한 기술이 먼저 보여요. 보유 기술은{" "}
                            <Link href="/analysis">갭 분석</Link>에서 바꿀 수
                            있어요.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        aria-expanded={isOpen}
                        aria-controls="job-form"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        + 공고 등록
                    </button>
                </div>

                <JobForm isOpen={isOpen} />

                {children}
            </main>
        </>
    );
}
