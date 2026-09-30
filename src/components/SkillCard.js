'use client'
export default function JobCard({ skill }) {
    // 보유 기술과 비교하여 class 추가
    // 보유했으면 chip-gap, 아니면 chip-owned
    /**
    예시코드: 
    <li className="chip chip-gap">! Docker<span className="sr-only">(부족)</span></li>
    <li className="chip chip-gap">! AWS<span className="sr-only">(부족)</span></li>
    <li className="chip chip-owned">✓ Python<span className="sr-only">(보유)</span></li>
    <li className="chip chip-owned">✓ FastAPI<span className="sr-only">(보유)</span></li>
     */

    return (
        <li className="chip chip-gap" key={skill}>{skill}</li>
    )
}