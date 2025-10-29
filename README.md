# 📝 메모 앱 (Memo App)

**핸즈온 실습용 Next.js 메모 애플리케이션**

Supabase 데이터베이스 기반의 완전한 CRUD 기능을 갖춘 메모 앱으로, MCP 연동 및 GitHub PR 생성 실습의 기반이 되는 프로젝트입니다.

> ✨ **최신 업데이트**: LocalStorage에서 Supabase로 마이그레이션 완료! ([MIGRATION.md](./MIGRATION.md) 참고)

## 🚀 주요 기능

- ✅ 메모 생성, 읽기, 수정, 삭제 (CRUD)
- 📂 카테고리별 메모 분류 (개인, 업무, 학습, 아이디어, 기타)
- 🏷️ 태그 시스템으로 메모 태깅
- 🔍 제목, 내용, 태그 기반 실시간 검색
- 🤖 AI 기반 메모 요약 기능 (Google Gemini API)
- 📱 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 🗄️ Supabase PostgreSQL 데이터베이스
- ⚡ Next.js 서버 액션으로 최적화된 데이터 페칭
- 🎨 모던한 UI/UX with Tailwind CSS

## 🛠 기술 스택

- **Framework**: Next.js 15.4.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Backend**: Next.js Server Actions
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **AI**: Google Gemini API (gemini-2.0-flash-001)
- **Package Manager**: npm

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini API (선택사항 - AI 요약 기능용)
GEMINI_API_KEY=your_gemini_api_key
```

**Supabase 설정 방법**:
1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. Settings → API에서 URL과 anon key 복사
3. `.env.local`에 추가

**Gemini API 설정 방법** (선택사항):
1. [Google AI Studio](https://aistudio.google.com/app/apikey)에서 API 키 발급
2. `.env.local`에 추가

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 브라우저 접속

```
http://localhost:3000
```

## 📁 프로젝트 구조

```
memo-app/
├── src/
│   ├── actions/
│   │   └── memo-actions.ts      # 서버 액션 (CRUD)
│   ├── app/
│   │   ├── api/
│   │   │   └── summarize/
│   │   │       └── route.ts     # AI 요약 API 라우트
│   │   ├── globals.css          # 글로벌 스타일
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   └── page.tsx             # 메인 페이지
│   ├── components/
│   │   ├── MemoDetailModal.tsx  # 메모 상세 모달
│   │   ├── MemoForm.tsx         # 메모 생성/편집 폼
│   │   ├── MemoItem.tsx         # 개별 메모 카드
│   │   └── MemoList.tsx         # 메모 목록 및 필터
│   ├── hooks/
│   │   └── useMemos.ts          # 메모 관리 커스텀 훅
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts        # Supabase 클라이언트
│   │       └── server.ts        # Supabase 서버 클라이언트
│   ├── types/
│   │   ├── database.types.ts    # Supabase DB 타입
│   │   └── memo.ts              # 메모 타입 정의
│   └── utils/
│       ├── localStorage.ts      # (deprecated)
│       └── seedData.ts          # (deprecated)
├── supabase/
│   └── migrations/              # 데이터베이스 마이그레이션
├── .env.local                   # 환경 변수
├── MIGRATION.md                 # 마이그레이션 가이드
└── README.md                    # 프로젝트 문서
```

## 💡 주요 컴포넌트

### MemoDetailModal

- 메모 상세 정보 표시
- AI 기반 메모 요약 기능 (Google Gemini API)
- 실시간 요약 생성 및 표시
- 편집/삭제 액션 버튼
- Markdown 렌더링 지원

### MemoItem

- 개별 메모를 카드 형태로 표시
- 편집/삭제 액션 버튼
- 카테고리 배지 및 태그 표시
- 날짜 포맷팅 및 텍스트 클램핑

### MemoForm

- 메모 생성/편집을 위한 모달 폼
- 제목, 내용, 카테고리, 태그 입력
- 태그 추가/제거 기능
- 폼 검증 및 에러 처리

### MemoList

- 메모 목록 그리드 표시
- 실시간 검색 및 카테고리 필터링
- 통계 정보 및 빈 상태 처리
- 반응형 그리드 레이아웃

## 📊 데이터 구조

```typescript
interface Memo {
  id: string // 고유 식별자
  title: string // 메모 제목
  content: string // 메모 내용
  category: string // 카테고리 (personal, work, study, idea, other)
  tags: string[] // 태그 배열
  createdAt: string // 생성 날짜 (ISO string)
  updatedAt: string // 수정 날짜 (ISO string)
}
```

## 🎯 실습 시나리오

이 프로젝트는 다음 3가지 실습의 기반으로 사용됩니다:

### 실습 1: Supabase MCP 마이그레이션 ✅ (완료)

- LocalStorage → Supabase 데이터베이스 전환
- MCP를 통한 자동 스키마 생성
- 서버 액션 구현 및 낙관적 업데이트
- 자세한 내용: [MIGRATION.md](./MIGRATION.md)

### 실습 2: 기능 확장 + GitHub PR (60분)

- 메모 즐겨찾기 기능 추가
- Cursor Custom Modes로 PR 생성
- 코드 리뷰 및 협업 실습

### 실습 3: Playwright MCP 테스트 (45분)

- E2E 테스트 작성
- 브라우저 자동화 및 시각적 테스트
- 성능 측정 및 리포트

자세한 실습 가이드는 강의자료를 참고하세요.

## 🎨 샘플 데이터

데이터베이스에 6개의 샘플 메모가 이미 시딩되어 있습니다:

- 프로젝트 회의 준비 (업무)
- React 18 새로운 기능 학습 (학습)
- 새로운 앱 아이디어: 습관 트래커 (아이디어)
- 주말 여행 계획 (개인)
- 독서 목록 (개인)
- 성능 최적화 아이디어 (아이디어)

## 🔧 개발 가이드

### 메모 CRUD 작업

```typescript
// useMemos 훅 사용 예시
const {
  memos, // 필터링된 메모 목록
  loading, // 로딩 상태
  createMemo, // 메모 생성 (async)
  updateMemo, // 메모 수정 (async)
  deleteMemo, // 메모 삭제 (async)
  searchMemos, // 검색
  filterByCategory, // 카테고리 필터링
  stats, // 통계 정보
} = useMemos()

// 메모 생성
await createMemo({
  title: '새 메모',
  content: '내용',
  category: 'personal',
  tags: ['태그1'],
})
```

### 서버 액션 직접 호출

```typescript
import {
  getMemos,
  createMemo,
  updateMemo,
  deleteMemo,
} from '@/actions/memo-actions'

// 모든 메모 가져오기
const memos = await getMemos()

// 메모 생성
const newMemo = await createMemo({
  title: '제목',
  content: '내용',
  category: 'work',
  tags: ['업무'],
})
```

## 🚀 배포

### Vercel 배포

```bash
npm run build
npx vercel --prod
```

### Netlify 배포

```bash
npm run build
# dist 폴더를 Netlify에 드래그 앤 드롭
```

## 📄 라이선스

MIT License - 학습 및 실습 목적으로 자유롭게 사용 가능합니다.

## 🤝 기여

이 프로젝트는 교육용으로 제작되었습니다. 개선사항이나 버그 리포트는 이슈나 PR로 제출해 주세요.

---

**Made with ❤️ for hands-on workshop**
