"use client";

import { jobApi } from "@/api/jobApi";
import { CATEGORIES, SKILLS } from "@/constants/skills";
import { useState } from "react";

export default function Form({ isOpen }) {
    const [form, setForm] = useState({
        company: "",
        position: "",
        deadline: "",
        link: "",
        skills: [], // 체크박스는 배열
    });

    const { company, position, deadline, link, skills } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheck = (id) => {
        setForm({
            ...form,
            skills: skills.includes(id)
                ? skills.filter((skill) => skill !== id)
                : [...skills, id],
        });
    };

    const handleReset = () => {
        // const shoudReset = window.confirm("등록폼을 초기화하겠습니까?");
        // if (!shoudReset) return;

        setForm({
            company: "",
            position: "",
            deadline: "",
            link: "",
            skills: [], // 체크박스는 배열
        });
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobData, setJobData] = useState([]);

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

    const handleRegister = async (e) => {
        // e.preventDefault(); // 새로고침 막기

        if (skills.length === 0) {
            setError("요구 기술을 1개 이상 골라주세요.");
            return;
        }

        try {
            setError(null);

            await jobApi.createJob({ ...form, deadline: deadline || null });
            await loadJobs();
            handleReset();
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return (
        <>
            {isOpen && (
                <form
                    id="job-form"
                    className="form-card"
                    onSubmit={handleRegister}
                >
                    <div>
                        <h2 className="section-title">새 공고 등록</h2>
                        <p className="section-desc">* 표시는 필수예요.</p>
                    </div>
                    {/* 필드들 */}
                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="company">회사명 *</label>
                            <input
                                id="company"
                                className="input"
                                placeholder="예: 청년취업사관학교"
                                name="company"
                                value={company}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="position">포지션 *</label>
                            <input
                                id="position"
                                className="input"
                                placeholder="예: AI 엔지니어"
                                name="position"
                                value={position}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="deadline">마감일</label>
                            <input
                                id="deadline"
                                className="input"
                                type="date"
                                name="deadline"
                                value={deadline}
                                onChange={handleChange}
                            />
                            <label className="inline-check">
                                <input type="checkbox" /> 상시채용
                            </label>
                        </div>
                        <div className="field">
                            <label htmlFor="link">공고 링크</label>
                            <input
                                id="link"
                                className="input"
                                type="url"
                                placeholder="https://"
                                name="link"
                                value={link}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* <!-- SKILLS 상수를 category별로 묶어 map. value를 저장, label을 표시 --> */}
                    <fieldset className="skill-fieldset">
                        <legend>
                            요구 기술 *
                            <span>
                                공고에 적힌 기술을 모두 골라주세요 · 4개 선택
                            </span>
                        </legend>

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
                                                onChange={() => {
                                                    handleCheck(skill.id);
                                                }}
                                                checked={
                                                    skills.includes(skill.id)
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
                    </fieldset>

                    {error && (
                        <p className="form-error" role="alert">
                            {error}
                        </p>
                    )}
                    {/* <!-- 등록 실패 시에만 렌더 --> */}
                    {/* <!-- <p className="form-error" role="alert">등록하지 못했어요. 입력한 내용은 그대로 두었으니 다시 시도해 주세요.</p> --> */}

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleReset}
                        >
                            취소
                        </button>
                        {/* <!-- 요청 중에는 disabled + "등록 중..." --> */}
                        <button type="submit" className="btn btn-primary">
                            등록
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}
