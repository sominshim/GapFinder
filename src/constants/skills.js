// 기술 목록 (고정 값)
// - id: 저장용 값. db.json 공고의 skills 배열과 보유 기술(mySkills)에 이 값이 들어간다.
// - name: 화면에 보여줄 짧은 이름
// - desc: 자세한 설명 (마우스를 올렸을 때 title로 표시)
// - category: 체크박스를 묶어 보여줄 분류
// 배열 순서 = 학습 우선순위에서 요구 공고 수가 같을 때의 순서

export const CATEGORIES = ["기초", "ML·DL", "LLM", "서빙·백엔드", "인프라·협업", "연구"];

export const SKILLS = [
    { id: "python", name: "Python", desc: "", category: "기초" },

    { id: "ml-basics", name: "머신러닝 기초", desc: "기본 개념·모델 학습", category: "ML·DL" },
    { id: "pytorch", name: "PyTorch", desc: "", category: "ML·DL" },
    { id: "huggingface", name: "Hugging Face", desc: "", category: "ML·DL" },
    { id: "ai-model-design", name: "모델 설계·개선", desc: "손실 함수, 아키텍처", category: "ML·DL" },
    { id: "multimodal", name: "멀티모달", desc: "이미지, 음성, 문서 데이터 처리", category: "ML·DL" },

    { id: "rag-pipeline", name: "RAG", desc: "파싱·청킹·임베딩·Vector DB·Reranking", category: "LLM" },
    { id: "llm-frameworks", name: "LangChain·LLM API", desc: "LangGraph, OpenAI/Claude API", category: "LLM" },
    { id: "prompt-engineering", name: "프롬프트 엔지니어링", desc: "Context 엔지니어링 포함", category: "LLM" },
    { id: "agent-design", name: "Agent 설계", desc: "Multi-Agent 포함", category: "LLM" },
    { id: "llm-evaluation", name: "LLM 평가", desc: "회귀 테스트·실패 원인 분석", category: "LLM" },
    { id: "llm-finetuning", name: "LLM 파인튜닝", desc: "자체 서빙 포함", category: "LLM" },

    { id: "fastapi", name: "FastAPI", desc: "서빙·비동기 처리", category: "서빙·백엔드" },
    { id: "inference-opt", name: "추론 최적화", desc: "vLLM, TensorRT, 양자화", category: "서빙·백엔드" },
    { id: "backend-db", name: "백엔드·DB", desc: "API 개발, SQL, 스키마 설계", category: "서빙·백엔드" },

    { id: "data-pipeline", name: "데이터 파이프라인", desc: "설계·구축·운영, ETL 포함", category: "인프라·협업" },
    { id: "docker-k8s", name: "Docker·K8s", desc: "Docker, Kubernetes", category: "인프라·협업" },
    { id: "aws-deploy", name: "클라우드 배포", desc: "AWS, GCP", category: "인프라·협업" },
    { id: "git", name: "Git 협업", desc: "코드 리뷰 포함", category: "인프라·협업" },

    { id: "paper-experience", name: "논문 구현", desc: "논문 조사·구현·게재 경험", category: "연구" },
];
