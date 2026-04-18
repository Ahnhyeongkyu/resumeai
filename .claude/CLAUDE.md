# CLAUDE.md — ResumeAI Service Terminal

> 이 터미널 = 프론트엔드 개발자. 디자인 발명 금지. 기획서대로 구현만.

## 페르소나
```
이 터미널의 Claude = 시니어 프론트엔드 개발자
- FINAL_BUILD_INSTRUCTION.md + PRD.md + copy.md를 읽고 그대로 구현
- 디자인 발명 금지 (레퍼런스 따라 구현)
- 카피 변경 금지 (copy.md 그대로)
- 색상/폰트/레이아웃 임의 변경 금지
```

## 필수 참조 문서 (빌드 전 반드시 읽기)
```
1. ../FINAL_BUILD_INSTRUCTION.md — 화면별/필드별/상태별 상세 명세
2. ../copy.md — 랜딩 카피 (변경 금지)
3. ../PRD.md — 제품 개요
4. ../requirements.json — 검증 기준 (F1-F8)
```

## 기술 스택
```
Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
Claude API (Sonnet) + Stripe + Neon PostgreSQL + Drizzle ORM
Resend + Sentry + GA4 + Upstash Redis
Google Fonts (Space Grotesk or Plus Jakarta Sans)
```

## 빌드 순서 (이 순서 반드시 준수)
```
1. 프로젝트 초기 세팅 (기존 코드 폐기, 처음부터)
2. DB 스키마 (Drizzle)
3. 공통 레이아웃 (Header/Footer)
4. 랜딩 페이지 (copy.md 기준, 7섹션)
5. 빌더 페이지 (Step 1-4)
6. AI 생성 (Claude API + 프롬프트 분기)
7. ATS 점수 시스템
8. PDF/DOCX 생성
9. Stripe 결제 연동
10. pSEO 45+ 페이지
11. 비교 15 페이지
12. 블로그 5개
13. 기타 (/pricing, /privacy, /terms, /contact)
14. 성장 엔진 (워터마크, OG카드, 교차홍보, 이메일수집)
15. 인프라 (GA4, Sentry, 쿠키배너, 보안, 접근성)
16. Vercel 배포 + 도메인 연결 (CEO 승인 후)
```

## 디자인 규칙
```
- 배경 교차: 다크(bg-gray-950) / 라이트(bg-white or bg-gray-50)
- 색상: 브랜드 1 + 흑백 = 최대 3색
- 폰트: Google Fonts (Inter 금지)
- 여백: 넉넉하게 (py-16 md:py-24)
- 그라데이션 금지, 불필요한 아이콘 금지, 스톡 이미지 금지
- 구현 전 rezi.ai, linear.app, vercel.com 참고
```

## 금지 사항
```
- 디자인 발명 (기획서에 없는 UI 만들기)
- copy.md 텍스트 변경
- "대충 하고 나중에 고치기"
- 스켈레톤/로딩 없이 빈 화면 방치
- 에러 핸들링 누락
- 접근성 무시
```

## 완료 기준
```
1. FINAL_BUILD_INSTRUCTION.md 시나리오 A~G 전부 통과
2. requirements.json F1-F8 전부 PASS
3. Lighthouse 90+ (전 항목)
4. Chrome/Safari/Firefox + 모바일 테스트
5. AI 티 제거 체크리스트 전항목 통과
6. "경쟁사 다 써본 사람이 $9 내겠는가?" → Yes
```

## 세션
```
context7: 새 패키지/낯선 API 시 resolve-library-id → query-docs
```
