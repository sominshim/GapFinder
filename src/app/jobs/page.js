'use client'
import JobCard from "@/components/JobCard";
import JobForm from "@/components/JobForm";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const API_URL = "http://localhost:4000/jobs"

            try {
                setLoading(true);
                setError(null);

                const res = await fetch(API_URL);

                if (!res.ok) {
                    throw new Error("db.json 데이터를 가져오지 못했다");
                }
                const result = await res.json();
                setJobData(result);

            } catch (error) {
                console.error("db.json 데이터를 가져오지 못했다", error)
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) { 
        return <div>로딩중</div>
    }

    if (error) {
        return <div>에러 발생: {error.message}</div>
    }
    
    if (!jobData) {
        return <div>등록한 채용 공고가 없습니다</div>
    }

    
    return (
        <>
        <main className="wrapper">
            <div className="page-head">
                <div>
                    <h1 className="page-title">채용 공고</h1>
                    <p className="page-desc">부족한 기술이 먼저 보여요. 보유 기술은 <Link href="analysis.html">갭 분석</Link>에서 바꿀 수 있어요.</p>
                </div>
                <JobForm/>
            </div>
            <ul className="job-grid">
                {jobData.map(job => <JobCard key={job.id} job={job}/>)} 
            </ul>
        </main>
            
        </>
    );

}