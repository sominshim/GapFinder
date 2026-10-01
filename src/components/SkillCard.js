"use client";
export default function SkillCard({ skill, owned }) {
    // 보유 기술과 비교하여 class 추가
    // 보유했으면 chip-gap, 아니면 chip-owned

    const isOwned = () => {
        if (owned) return "chip chip-owned";
        return "chip chip-gap";
    };

    return (
        <li className={isOwned()}>
            {owned ? "✓" : "!"} {skill}
        </li>
    );
}
