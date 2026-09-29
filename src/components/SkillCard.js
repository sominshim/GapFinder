'use client'
export default function JobCard({ skill }) {
    // 보유 기술과 비교하여 class 추가
    // 보유했으면 chip-gap, 아니면 chip-owned

    return (
        <li className="chip chip-gap" key={skill}>{skill}</li>
    )
}