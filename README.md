# Comet Frontend

React + TypeScript + Vite + Tailwind CSS v4 기반 UI/UX 프로토타입. 반응형 App Shell, 재생바에서 여는 PC·모바일 공통 확장 Now Playing 및 대기열 목업을 제공한다. Library는 Mock 탐색을, Device Information은 시뮬레이션한 기기 상태와 추이를 제공하며 나머지 탐색 페이지는 플레이스홀더다.

```sh
npm install
npm run dev
npm run typecheck
npm run build
```

- `src/components/`: App Shell 및 공통 UI 컴포넌트
- `src/pages/`: 페이지
- `src/mocks/`: 가상 앨범·곡·기기 데이터와 프론트엔드 재생 상태
- `src/layout/`: 공통 화면 모드 Provider
- `src/i18n/`: 영어 사전과 언어 Provider
- `src/styles/global.css`: 디자인 토큰과 전역 스타일

작업 전 PRODUCT.md와 DESIGN.md를 확인한다. 실제 서비스 연동은 포함하지 않는다.

## UI 캡처 보드

```sh
npx playwright install chromium  # 최초 1회
npm run capture:ui
```

PC·모바일 Library의 앨범·아티스트·트랙·폴더·상세 화면, Device Information과 Now Playing·Empty, 모바일 검색 상태와 Device Information의 System·Up next 스크롤 위치를 자동 캡처한다. 임시 개발 서버와 브라우저는 실행 후 종료한다.
`artifacts/ui-board/<실행 시각>/`에 고해상도(2배) 통합 `board.png`, 원본 PNG, 클릭해서 원본을 볼 수 있는 `index.html`, 캡처 목록 `manifest.json`을 생성한다. 생성물은 Git에서 제외한다.

기존 Chromium을 사용하려면 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`에 실행 파일 경로를 지정한다. 캡처 대상·화면 크기는 `scripts/capture-ui.mjs` 상단에서 조정한다. 모션은 생략하고 폰트 로딩 후 캡처하며 Dev tools는 결과물에서 숨긴다. 각 캡처는 현재 보이는 영역을 담으며 모바일 System과 Up next는 별도 스크롤 위치에서 추가 캡처한다.

UI 구조·진입 경로·주요 상태·반응형 배치 변경 시 캡처 시나리오도 함께 검토·갱신한다. 현재 캡처 화면은 검토용 세트이며 고정 규격이 아니다. 새 핵심 영역이 화면 아래에 있으면 해당 스크롤 위치를 별도로 캡처하고, 불필요해진 대상은 제거한다. 캡처 세트가 바뀌면 이 설명도 동기화한다.
