# 🚀 여행가자

**Vite + React 19 + React Compiler + TypeScript + TailwindCSS 기반 프로젝트**

<br/>

## ⚙️ 개발 환경 셋업

### 1. Prerequisites

- Node.js ≥ 20.x
- pnpm (권장) / npm / yarn

### 2. dependency 설치 및 실행

```bash
pnpm install
pnpm dev
```

> ✅ 기본 포트: http://localhost:5173

<br/>

## 🧱 프로젝트 구조

```bash
src/
 ┣ api/              # 백엔드 API와의 통신 로직 (ex. userApi, productApi 등)
 ┣ assets/           # 이미지, 폰트 등 정적 자원
 ┣ components/       # 재사용 가능한 UI 컴포넌트
 ┣ features/         # 도메인 별로 구분
 ┣ hooks/            # 커스텀 React Hook (ex. useFetch, useModal 등)
 ┣ lib/              # 외부 라이브러리 관련 유틸 (axios, shadcn/ui 등)
 ┣ store/            # Zustand 전역 상태 관리
 ┣ types/            # 공통 타입 정의 (User, Product 등)
 ┣ utils/            # 재사용 가능한 유틸리티 함수 (ex. phone, localStorage 등)
 ┣ App.tsx           # 루트 컴포넌트
 ┣ index.css         # 전역 CSS 설정 (tailwindcss 적용)
 ┗ main.tsx          # 진입점
```

<br/>

## 🎨 스타일 설정

- TailwindCSS 기반
- 전역 스타일: `index.css`
- 컴포넌트 단위 스타일: `className` + Tailwind 유틸 조합
- 복잡한 조건부 스타일 → `cn()` 사용 (`src/lib/utils.ts`)

```ts
import { cn } from "@/lib/utils"

<div className={cn("p-4", isActive && "bg-blue-500")} />

```

<br/>

## 👼 상태 관리 (Zustand)

- 상태는 `src/store/`에서 도메인 단위로 관리
- 각 store는 훅 형태로 export
- 예시:

```ts
import { create } from 'zustand'

interface UserState {
  name: string
  setName: (v: string) => void
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  setName: (v) => set({ name: v }),
}))
```
