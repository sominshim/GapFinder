import SkillCard from "@/components/SkillCard";
import { SKILLS } from "@/constants/skills";
import { getFitScore } from "@/utils/analysis";

export default function JobCard({ job, mySkills, handleDelete }) {
    const { company, position, skills, deadline, link } = job;
    const { ownedCount, totalCount, percent } = getFitScore(
        job.skills,
        mySkills,
    );

    // 미보유(false) 먼저, 보유(true) 나중
    const sortedSkills = [...skills].sort(
        (a, b) => mySkills.includes(a) - mySkills.includes(b),
    );
    // console.log(ownedCount, totalCount, percent);
    return (
        <>
            <li className="job-card">
                <div className="job-card-header">
                    <div>
                        <h2 className="job-card-title">
                            {company} · {position}
                        </h2>
                        <p className="job-card-subtitle">
                            {deadline ? deadline : "상시채용"}

                            {link && (
                                <>
                                    {" · "}
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        원문 보기
                                    </a>
                                </>
                            )}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="icon-button"
                        aria-label={`${company} 공고 삭제`}
                        onClick={() => {
                            handleDelete(job.id);
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                        </svg>
                    </button>
                </div>
                <ul className="chips" aria-label="요구 기술">
                    {sortedSkills.map((skill) => (
                        <SkillCard
                            key={skill}
                            skill={
                                SKILLS.find((s) => s.id === skill)?.name ??
                                skill
                            }
                            owned={mySkills.includes(skill)}
                        />
                    ))}
                </ul>
                <div className="fit">
                    <span className="fit-label">기술 적합도</span>
                    <div
                        className="fit-bar"
                        role="img"
                        aria-label={`기술 적합도 ${percent ?? 0}%`}
                    >
                        <div
                            className="fit-fill"
                            style={{
                                width: `${percent ?? 0}%`,
                            }}
                        ></div>
                    </div>
                    <span className="fit-value">
                        <strong>{percent ?? 0}%</strong>
                        {totalCount}개 중 {ownedCount}개
                    </span>
                </div>
            </li>
        </>
    );
}
