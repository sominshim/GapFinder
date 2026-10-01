"use client";
import { jobApi } from "@/api/jobApi";
import { useSkillStore } from "@/stores/useSkillStore";
import {
    getAverageFit,
    getFitScore,
    getMissingSkills,
    getSkillFrequency,
    verification,
} from "@/utils/analysis";

import { useEffect, useState } from "react";

export default function Home() {
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

    const { mySkills } = useSkillStore();
    // console.log("보유 스킬:", mySkills);

    for (const data of jobData) {
        const { ownedCount, totalCount, percent } = getFitScore(
            data.skills,
            mySkills,
        );
    }

    function verification() {
        console.log(
            "getFitScore 검증: ",
            getFitScore(
                ["python", "pytorch", "rag-pipeline", "docker-k8s"],
                ["python", "docker-k8s"],
            ), // == { ownedCount: 2, totalCount: 4, percent: 50 },
        );
        console.log(
            "getFitScore 검증: ",
            getFitScore([], ["python"]),
            // percent: null
        );
        console.log(
            "getSkillFrequency 검증: ",
            getSkillFrequency([
                { skills: ["python", "git"] },
                { skills: ["python"] },
            ]), // { python: 2, git: 1 }
        );
        console.log(
            getAverageFit(
                [{ skills: ["python"] }, { skills: ["git"] }],
                ["python"],
            ),
            // 50
        );
        console.log(
            getAverageFit([], ["python"]),
            // null
        );
    }
    // verification();

    return (
        <>
            <p>하이</p>
        </>
    );
}
