'use client'
export default function Form({ isOpen }) {
    
    return (
        <>
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