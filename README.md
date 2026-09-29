## 폴더 구조

```
src/
├─ app/          화면(라우트)
├─ components/   재사용 UI
├─ api/          서버 요청 함수
├─ stores/       공유 상태 (Zustand)
├─ constants/    고정 데이터
└─ utils/        계산 로직
```

폴더는 **바뀌는 이유**를 기준으로 나눴다. 화면 모양, 서버 주소, 계산식, 기술 목록은 각각 다른 이유로 바뀌기 때문에, 하나를 고칠 때 다른 파일을 건드리지 않도록 분리했다.

| 폴더 | 들어가는 것 | 분리한 이유 |
| --- | --- | --- |
| `app/` | `jobs/page.js`, `analysis/page.js`, 공통 헤더(`layout.js`), `globals.css` | Next.js App Router 규칙상 폴더 구조가 곧 URL이다. 페이지는 데이터를 불러오고 컴포넌트를 배치하는 역할만 맡는다. |
| `components/` | `JobCard`, `SkillCheck`, 상태 안내(Loading·Error·Empty) | 두 화면에서 같은 모양을 반복해서 쓴다. props로 받은 값만 그리고 데이터가 어디서 왔는지는 모르게 해서, 어느 화면에서든 재사용할 수 있다. |
| `api/` | `getJobs`, `createJob`, `deleteJob`, `BASE_URL` | 요청 주소와 요청 방식을 한곳에 모았다. 실제 백엔드로 바꿀 때 수정 범위가 이 폴더로 좁혀진다. (응답 형태나 오류 처리 방식이 달라지면 추가 수정이 필요할 수 있다.) |
| `stores/` | `useSkillStore` (보유 기술 + persist) | 목록 화면과 분석 화면이 **함께** 쓰고, 새로고침 후에도 **유지**해야 하는 상태만 둔다. 서버 데이터(공고 목록)는 넣지 않는다. |
| `constants/` | `skills.js` (기술 20개의 `value`·`label`·`category`) | 사용자가 추가·수정하지 않는 고정 값이라 API로 받을 이유가 없다. 선택형 입력의 기준이 되어 `PyTorch`/`pytorch` 같은 표기 불일치를 막는다. |
| `utils/` | `analysis.js` (기술 적합도, 요구 빈도, 학습 우선순위, 학습 효과 시뮬레이션) | React와 상관없는 순수 계산 함수라 따로 뒀다. 두 화면에서 같이 쓰고, 화면 없이 콘솔만으로 결과를 검증할 수 있다. 계산 결과는 저장하지 않고 매번 계산한다. |

### 파일 간 의존 방향

```
app (화면)
 ├─→ components (UI)
 ├─→ api (서버 요청)
 ├─→ stores (공유 상태)
 └─→ utils (계산) ─→ constants (기술 목록)
```

화면만 다른 폴더를 가져다 쓰고, `utils`와 `constants`는 다른 폴더에 의존하지 않는다. 그래서 계산 로직과 기술 목록은 화면 구조가 바뀌어도 영향을 받지 않는다.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
