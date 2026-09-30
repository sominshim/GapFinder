'use client'
import { jobApi } from "@/api/jobApi";
import JobCard from "@/components/JobCard";

import { useEffect, useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobData, setJobData] = useState([]);

    // 조회 API
    const loadJobs = async() => {
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
    }

    // 삭제 API
    const handleDelete = async(id) => {
        const shoudDelete = window.confirm("정말 삭제할까요?");

        if (!shoudDelete) return;

        try {
            setError(null);
            await jobApi.deleteJob(id);
            await loadJobs();
        } catch(error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        loadJobs();
    }, []);

    // 로딩 메시지
    if (loading) return (
        <div className="job-card" aria-busy="true" aria-label="공고를 불러오는 중">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="chips">
                <div className="skeleton skeleton-chip"></div>
                <div className="skeleton skeleton-chip"></div>
                <div className="skeleton skeleton-chip"></div>
            </div>
            <div className="skeleton skeleton-bar"></div>
        </div>
    );

    // 에러 메시지
    if (error) return (
        <div className="state state-error" role="alert">
            <svg className="state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>
            <p className="state-title">공고를 불러오지 못했어요</p>
            <p className="state-desc">json-server가 켜져 있는지 확인해 주세요.</p>
            <button type="button" className="btn btn-primary" onClick={() => loadJobs()}>다시 시도</button>
        </div>
    );

    // 공고등록 안내 문구
    // console.log(jobData); // []
    if (jobData.length === 0) return (
        <div className="state">
            <svg className="state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
            <p className="state-title">아직 등록한 공고가 없어요</p>
            <p className="state-desc">관심 있는 공고를 하나 등록해 보세요.</p>
            {/* <button type="button" className="btn btn-primary">+ 공고 등록</button> */}
        </div>
    );
    
    return (
        <>
        <ul className="job-grid">
            {jobData.map(job => <JobCard key={job.id} job={job} handleDelete={handleDelete}/>)} 
        </ul>
        </>
    );

}