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

    // console.log("mySkills: ", mySkills);
    // console.log("jobData: ", jobData);

    if (loading) {
        return <>로딩중</>;
    }
    if (error) {
        return <>에러발생: {error}</>;
    }
    return (
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
                <aside className="panel sidebar" aria-labelledby="my-skills">
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

                <AnalysisResult jobs={jobData} mySkills={mySkills} />
            </div>
        </main>
    );
}
