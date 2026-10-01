import { getAverageFit, getMissingSkills } from "@/utils/analysis";
import Link from "next/link";
import { useState } from "react";

export default function AnalysisResult({ jobs, mySkills }) {
    // console.log("jobs: ", jobs);

    const jobCount = jobs.length; // 공고 개수
    const averageFit = getAverageFit(jobs, mySkills); // 평균 기술 적합도
    const missingSkills = getMissingSkills(jobs, mySkills); // 부족한 기술
    const missingCount = missingSkills.length; // 부족한 기술 개수
    const topSkills = missingSkills.slice(0, 3); // 먼저 공부할 top5 기술
    const maxCount = missingSkills[0]?.count ?? 0;

    const [assumedSkill, setAssumedSkill] = useState(null); // 배웠다고 가정한 기술

    // assumedSkill 배웠을 때, 평균 기술 적합도 계산
    const assumedFit = assumedSkill
        ? getAverageFit(jobs, [...mySkills, assumedSkill])
        : null;

    // 배웠다고 가정한 기술의 이름 가져오기
    const assumedName = topSkills.find(
        (skill) => skill.id === assumedSkill,
    )?.name;

    const handleAssumeToggle = (id) => {
        setAssumedSkill(assumedSkill === id ? null : id);
    };

    // 예외 관리
    // 보유 기술 입력 안내
    if (mySkills.length === 0) {
        return (
            <div>
                <div className="state">
                    <svg
                        className="state-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12l4 4 10-10" />
                    </svg>
                    <p className="state-title">가진 기술을 먼저 골라주세요</p>
                    <p className="state-desc">
                        왼쪽에서 할 줄 아는 기술을 누르면 부족한 기술을
                        찾아드려요.
                    </p>
                </div>
            </div>
        );
    }

    // 공고 등록 안내
    if (jobCount === 0) {
        return (
            <div>
                <div className="state">
                    <svg
                        className="state-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M4 20V11M10 20V5M16 20v-6M3 20h18" />
                    </svg>
                    <p className="state-title">분석할 공고가 없어요</p>
                    <p className="state-desc">
                        공고를 1개 이상 등록하면 분석이 시작돼요.
                    </p>
                    <Link href={"/jobs"} className="btn btn-secondary">
                        공고 모으러 가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="analysis-main">
                <section className="stats" aria-label="요약">
                    <div className="stat">
                        <span className="stat-label">분석한 공고</span>
                        <span className="stat-value">{jobCount}개</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">평균 기술 적합도</span>
                        <span className="stat-value">{averageFit}%</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">부족한 기술</span>
                        <span className="stat-value is-gap">
                            {missingCount}개
                        </span>
                    </div>
                </section>

                <section
                    className="panel priority"
                    aria-labelledby="priority-title"
                >
                    <div>
                        <h2 id="priority-title" className="priority-title">
                            이것부터 공부하세요
                        </h2>
                        <p className="section-desc">
                            내가 없는 기술 중 많은 공고가 요구하는 순서예요.
                        </p>
                    </div>

                    {/* <!-- 학습 우선순위 TOP 3: 막대 폭 = 요구 공고 수 / 1위 공고 수 × 100 --> */}
                    <ol>
                        {topSkills.map((skill, index) => (
                            <li className="priority-item" key={skill.id}>
                                <span className="priority-rank">
                                    {index + 1}
                                </span>
                                <span className="priority-name">
                                    {skill.name}
                                </span>
                                <div className="bar">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${(skill.count / jobCount) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                                <span className="priority-count">
                                    {skill.count}개 공고
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-small"
                                    aria-pressed={assumedSkill === skill.id}
                                    onClick={() => handleAssumeToggle(skill.id)}
                                >
                                    {assumedSkill === skill.id
                                        ? "가정 해제"
                                        : "배웠다면?"}
                                </button>
                            </li>
                        ))}
                    </ol>

                    {/* <!-- 가정한 기술이 있을 때만 sim-box, 없으면 sim-hint --> */}
                    {assumedSkill ? (
                        <div className="sim-box" role="status">
                            <p className="sim-box-title">
                                <strong>{assumedName}</strong> 학습 시
                            </p>
                            <div className="sim-metric">
                                <span className="sim-metric-label">
                                    평균 기술 적합도
                                </span>
                                <span className="sim-metric-value">
                                    {averageFit}% → {assumedFit}%
                                    <span className="sim-up">
                                        +{assumedFit - averageFit}%p
                                    </span>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="sim-hint">
                            "배웠다면?" 버튼을 누르면 기술 적합도가 얼마나
                            향상되는지 알 수 있습니다
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
