import { SKILLS } from "@/constants/skills";

// 기술 적합도 (공고 하나)
export function getFitScore(JobSkills, mySkills) {
    const totalCount = JobSkills.length;

    const setJob = new Set([...JobSkills]);
    const setMy = new Set([...mySkills]);
    const ownedCount = setJob.intersection(setMy).size;
    let percent = null;

    if (totalCount !== 0) {
        percent = Math.round((ownedCount / totalCount) * 100);
    }

    return { ownedCount, totalCount, percent };
}

// 평균 기술 적합도 (공고 전체)
export function getAverageFit(jobs, mySkills) {
    let count = 0;
    let percentSum = 0;

    for (const job of jobs) {
        let { percent } = getFitScore(job.skills, mySkills);
        if (percent !== null) {
            percentSum += Number(percent);
            count += 1;
        }
    }
    if (count === 0) return null;
    return Math.round(percentSum / count);
}

// 기술 요구 빈도 (공고 전체)
export function getSkillFrequency(jobs) {
    const frequency = {};

    for (const job of jobs) {
        for (const skill of job.skills) {
            if (frequency[skill]) {
                frequency[skill] += 1;
            } else {
                frequency[skill] = 1;
            }
        }
    }
    return frequency;
}

// 학습 우선순위
export function getMissingSkills(jobs, mySkills) {
    const frequency = getSkillFrequency(jobs);
    const missingSkills = [];

    for (const { id, name } of SKILLS) {
        if (id in frequency && !mySkills.includes(id)) {
            missingSkills.push({
                id: id,
                name: name,
                count: frequency[id],
            });
        }
    }
    return missingSkills.sort((a, b) => b.count - a.count);
}
