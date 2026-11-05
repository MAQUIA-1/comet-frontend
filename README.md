# Comet Frontend

React + TypeScript + Vite + Tailwind CSS v4 기반 UI/UX 프로토타입. 현재 반응형 App Shell과 페이지 전환을 구현했으며 Now Playing과 공유 플레이어 목업을 제공하며 다른 페이지는 플레이스홀더다.

```sh
npm install
npm run dev
npm run typecheck
npm run build
```

- `src/components/`: App Shell 및 공통 UI 컴포넌트
- `src/pages/`: 페이지
- `src/mocks/`: 가상 곡 데이터와 프론트엔드 재생 상태
- `src/i18n/`: 영어 사전과 언어 Provider
- `src/styles/global.css`: 디자인 토큰과 전역 스타일

작업 전 PRODUCT.md와 DESIGN.md를 확인한다. 실제 서비스 연동은 포함하지 않는다.
