import SkillCard from "@/components/SkillCard";

export default function JobCard({ job }) {
    const {company, deadline, link, skills} = job;

    return (
        <> 
            <li className="job-card">
                <div className="job-card-header">
                    <div>
                        <h2 className="job-card-title">{company}</h2>
                        <p className="job-card-subtitle">{deadline} · <a href={link} target="_blank" rel="noopener noreferrer">원문 보기</a></p>
                    </div>
                    <button type="button" className="icon-button" aria-label={`${company} 공고 삭제`}>
                        <svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.8" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            aria-hidden="true"
                            >
                            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>
                        </svg>
                    </button>
                </div>
                <ul className="chips" aria-label="요구 기술">
                    {skills.map((skill) => <SkillCard key={skill} skill={skill}/>)}
                    <li className="chip chip-gap">! Docker<span className="sr-only">(부족)</span></li>
                    <li className="chip chip-gap">! AWS<span className="sr-only">(부족)</span></li>
                    <li className="chip chip-owned">✓ Python<span className="sr-only">(보유)</span></li>
                    <li className="chip chip-owned">✓ FastAPI<span className="sr-only">(보유)</span></li>
                </ul>
                <div className="fit">
                <span className="fit-label">기술 적합도</span>
                <div className="fit-bar" role="img" aria-label="기술 적합도 50%">
                    <div className="fit-fill" style={{ width: "50%" }}></div>
                </div>
                <span className="fit-value"><strong>50%</strong>4개 중 2개</span>
                </div>
            </li>
        
        </>
    );
}