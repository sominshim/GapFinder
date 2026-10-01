"use client";
import { useSkillStore } from "@/stores/useSkillStore";
import { CATEGORIES, SKILLS } from "@/constants/skills";
import { useEffect, useState } from "react";
import { jobApi } from "@/api/jobApi";
import AnalysisResult from "@/components/AnalysisResult";

export default function Home() {
    const { mySkills, toggleSkill } = useSkillStore();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobData, setJobData] = useState([]);

    // 조회 API
    const loadJobs = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await jobApi.getJobs();
            setJobData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    // 오른쪽 결과 자리에 들어갈 것만 고르는 함수
    const renderResult = () => {
        if (loading) {
            return (
                <div>
                    <div
                        className="job-card"
                        aria-busy="true"
                        aria-label="공고를 불러오는 중"
                    >
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-line"></div>
                        <div className="chips">
                            <div className="skeleton skeleton-chip"></div>
                            <div className="skeleton skeleton-chip"></div>
                            <div className="skeleton skeleton-chip"></div>
                        </div>
                        <div className="skeleton skeleton-bar"></div>
                    </div>
                </div>
            );
        }
        if (error) {
            return (
                <div>
                    <div className="state state-error" role="alert">
                        <svg
                            className="state-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7.5v5.5M12 16.5h.01" />
                        </svg>
                        <p className="state-title">공고를 불러오지 못했어요</p>
                        <p className="state-desc">
                            json-server가 켜져 있는지 확인해 주세요.
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={loadJobs}
                        >
                            다시 시도
                        </button>
                    </div>
                </div>
            );
        }
        return <AnalysisResult jobs={jobData} mySkills={mySkills} />;
    };

    return (
        <>
            <main className="wrapper">
                <div className="page-head">
                    <div>
                        <h1 className="page-title">갭 분석</h1>
                        <p className="page-desc">
                            모은 공고와 내 보유 기술을 비교해 무엇부터 공부할지
                            알려줘요.
                        </p>
                    </div>
                </div>

                <div className="analysis-layout">
                    {/* <!-- ===== 왼쪽: 입력 (보유 기술, Zustand + persist) ===== --> */}
                    <aside
                        className="panel sidebar"
                        aria-labelledby="my-skills"
                    >
                        <div>
                            <h2 id="my-skills" className="section-title">
                                내 보유 기술
                                <span className="count">{mySkills.length}</span>
                            </h2>
                            <p className="section-desc">
                                누르면 바로 다시 계산되고, 선택은 저장돼요.
                            </p>
                        </div>

                        {/* 분류별로 SKILLS를 묶어서 체크 칩으로 표시 */}
                        {CATEGORIES.map((category) => (
                            <div className="skill-group" key={category}>
                                <p className="skill-group-name">{category}</p>
                                <div className="skill-options">
                                    {SKILLS.filter(
                                        (skill) => skill.category === category,
                                    ).map((skill) => (
                                        <label
                                            className="skill-check"
                                            key={skill.id}
                                            title={skill.desc}
                                        >
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                name={skill.id}
                                                onChange={() =>
                                                    toggleSkill(skill.id)
                                                }
                                                checked={
                                                    mySkills.includes(skill.id)
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <span>{skill.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </aside>

                    {renderResult()}
                </div>
            </main>
        </>
    );
}
