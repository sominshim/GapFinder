'use client'

import { useState } from "react";

export default function Form() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <button type="button" className="btn btn-primary" aria-expanded={isOpen} aria-controls="job-form" onClick={() => setIsOpen(!isOpen)}>+ 공고 등록</button>

        {isOpen && (
            <form id="job-form" className="form-card">
            <div>
                <h2 className="section-title">새 공고 등록</h2>
                <p className="section-desc">* 표시는 필수예요.</p>
            </div>
            {/* 필드들 */}
            </form>
        
        )}
        </>
    );
}