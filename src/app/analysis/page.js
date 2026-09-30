"use client";
import { useSkillStore } from "@/stores/useSkillStore";
import { CATEGORIES, SKILLS } from "@/constants/skills";

export default function Home() {
    const { mySkills, toggleSkill } = useSkillStore();

    console.log(mySkills);

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

                {/* <!-- ===== 오른쪽: 결과 ===== --> */}
                <div className="analysis-main">
                    <section className="stats" aria-label="요약">
                        <div className="stat">
                            <span className="stat-label">분석한 공고</span>
                            <span className="stat-value">6개</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">평균 기술 적합도</span>
                            <span className="stat-value">50%</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">부족한 기술</span>
                            <span className="stat-value is-gap">9개</span>
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

                        {/* <!-- 학습 우선순위 TOP 5: 막대 폭 = 요구 공고 수 / 1위 공고 수 × 100 --> */}
                        <ol>
                            <li className="priority-item">
                                <span className="priority-rank">1</span>
                                <span className="priority-name">Docker</span>
                                <div className="bar">
                                    <div
                                        className="bar-fill"
                                        style={{ width: "100%" }}
                                    ></div>
                                </div>
                                <span className="priority-count">3개 공고</span>
                                <button
                                    type="button"
                                    className="btn btn-small"
                                    aria-pressed="true"
                                >
                                    가정 해제
                                </button>
                            </li>
                            <li className="priority-item">
                                <span className="priority-rank">2</span>
                                <span className="priority-name">LangChain</span>
                                <div className="bar">
                                    <div
                                        className="bar-fill"
                                        style={{ width: "67%" }}
                                    ></div>
                                </div>
                                <span className="priority-count">2개 공고</span>
                                <button
                                    type="button"
                                    className="btn btn-small"
                                    aria-pressed="false"
                                >
                                    배웠다면?
                                </button>
                            </li>
                            <li className="priority-item">
                                <span className="priority-rank">3</span>
                                <span className="priority-name">RAG</span>
                                <div className="bar">
                                    <div
                                        className="bar-fill"
                                        style={{ width: "67%" }}
                                    ></div>
                                </div>
                                <span className="priority-count">2개 공고</span>
                                <button
                                    type="button"
                                    className="btn btn-small"
                                    aria-pressed="false"
                                >
                                    배웠다면?
                                </button>
                            </li>
                        </ol>

                        {/* <!-- 선택 1: 가정한 기술이 있을 때만 sim-box, 없으면 sim-hint --> */}
                        <div className="sim-box" role="status">
                            <p className="sim-box-title">
                                <strong>Docker</strong>를 배우면
                            </p>
                            <div className="sim-metric">
                                <span className="sim-metric-label">
                                    평균 기술 적합도
                                </span>
                                <span className="sim-metric-value">
                                    50% → 62%
                                    <span className="sim-up">+12%p</span>
                                </span>
                            </div>
                            <div className="sim-metric">
                                <span className="sim-metric-label">
                                    적합도 70% 이상 공고
                                </span>
                                <span className="sim-metric-value">
                                    1개 → 3개
                                </span>
                            </div>
                        </div>
                        {/* <!-- <p className="sim-hint">배웠다면?을 누르면 그 기술을 익혔을 때 평균 기술 적합도가 얼마나 오르는지 보여줘요. 실제 보유 기술은 바뀌지 않아요.</p> --> */}
                    </section>
                </div>
            </div>
        </main>
    );
}
