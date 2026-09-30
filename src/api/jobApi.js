const BASE_URL = "http://localhost:4000/jobs";

export const jobApi = {
    getJobs: async () => {
        const response = await fetch(BASE_URL);

        if(!response.ok) {
            throw new Error("공고를 가져오는 데 에러가 발생했습니다");
        }

        return response.json();
    },
    deleteJob: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });

        if(!response.ok) {
            throw new Error("공고를 삭제하는 데 에러가 발생했습니다");
        }

        return true; // 성공 여부만 반환
    }
}