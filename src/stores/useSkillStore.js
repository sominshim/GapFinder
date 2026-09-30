import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSkillStore = create(
    persist((set) => ({
        mySkills: [], // state

        toggleSkill: (skill) =>
            set((state) => ({
                mySkills: state.mySkills.includes(skill) // 해당 스킬 보유하고 있다면
                    ? state.mySkills.filter((item) => item !== skill) // 삭제
                    : [...state.mySkills, skill], // 추가
            })), // action
    })),
    { name: "skill-storage" },
);
