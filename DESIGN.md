# Comet 디자인 방향

## 기준 파일
디자인 토큰과 전역 스타일은 `src/styles/global.css`에서 관리한다. Tailwind CSS v4의 CSS-first `@theme`을 사용한다. 현재 수치는 확정 규격이 아닌 초기 제안값이다.

## 색상과 형태
Charcoal Black / White / Champagne Gold를 기본 방향으로 삼는다. Canvas #101113, Surface #202123, Raised Surface #2B2C2F, Foreground #F5F5F3, Muted #A0A1A4, Accent #C6A66B를 제안한다.
패널 radius는 12px, 컨트롤 radius는 8px, gutter는 8px이다. 컴포넌트에서 임의의 색상 코드나 radius를 하드코딩하지 않는다.
골드는 활성 상태와 중요한 인터랙션에 한정한다. 기본 안내 화면에서는 골드를 사용하지 않는다.

## Floating Panel Layout
VS Code Modern UI와 유사하게 Canvas 위에 독립된 rounded panel을 배치한다. 패널 사이에는 일정한 gutter를 둔다. 불필요한 카드 중첩, 테두리, 그림자는 최소화한다. 구체적인 패널 배치와 크기는 미정이다.

## 타이포그래피
시스템 sans-serif를 초기 기본값으로 사용한다. 제목, 본문, 보조 정보의 크기·굵기·명도 차이로 정보 계층을 만든다. 최종 폰트와 상세 타입 스케일은 미정이다.

## 반응형 UI
작은 화면에서도 콘텐츠가 잘리거나 불필요한 가로 스크롤이 생기지 않도록 한다. 패널 간 gutter와 정보 계층을 유지하고 여백을 조절한다. 패널 재배치, 숨김 정책 및 구체적인 breakpoint 설계는 미정이다.
