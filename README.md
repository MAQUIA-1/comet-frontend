# Comet Frontend

Comet 네트워크 오디오 트랜스포트의 웹 플레이어 UI/UX 프로토타입이다. React, TypeScript, Vite, Tailwind CSS v4를 사용한다.

모든 화면은 Mock 데이터와 브라우저의 임시 상태로 동작한다. 실제 오디오 재생, 백엔드, 기기 및 시스템 서비스에는 연결되지 않는다.

## 현재 구현

- **Library**: 앨범·아티스트·곡·폴더 탐색, 앨범 상세, 현재 화면의 항목 검색과 곡 선택. 정렬과 고급 필터는 아직 구현하지 않았다.
- **Now Playing**: PC 재생바와 모바일 미니 플레이어에서 여는 확장 플레이어, 재생 조작과 Up next 목업.
- **Signal Chain**: 전체 Processing 스위치와 예시 모듈의 추가·삭제·순서 변경·Bypass·파라미터 조작 목업.
- **Device Information**: 오디오, 네트워크와 시스템 상태 및 트래픽의 예시·시뮬레이션 값.
- **Playlists / Settings**: 본문은 플레이스홀더다. 모바일 Settings에서 Device Information으로 이동할 수 있다.

목업 상태는 새로고침하면 초기화된다. 개발 서버에서는 Dev tools로 재생 시나리오를 바꿔 볼 수 있다.

## 시작하기

Node.js 22와 npm을 사용한다. GitHub Actions도 Node.js 22로 빌드한다.

```sh
npm install
npm run dev
```

터미널에 표시된 주소를 브라우저에서 연다. 타입 검사와 프로덕션 빌드는 다음 명령으로 실행한다.

```sh
npm run typecheck
npm run build
npm run preview  # 빌드 결과 확인
```

## GitHub Pages

[배포된 목업](https://maquia-1.github.io/comet-frontend/)은 `main`에 푸시하거나 Actions에서 수동 실행하면 GitHub Actions가 빌드하여 배포한다. 저장소 Settings → Pages의 Source는 GitHub Actions를 사용한다. 배포 설정은 [pages.yml](.github/workflows/pages.yml)에 있다.

## UI 캡처 보드

PC·모바일의 Library, Signal Chain, Device Information, Now Playing과 주요 상태를 비교하는 보드를 생성한다. 모바일 검색과 System·Signal Chain 파라미터·Up next의 스크롤 위치도 포함한다.

```sh
npx playwright install chromium  # 최초 1회
npm run capture:ui
```

결과는 Git에서 제외되는 `artifacts/ui-board/<실행 시각>/`에 저장된다. `board.png`는 통합 보드, `index.html`은 원본 캡처를 열 수 있는 보드이며, 원본 PNG와 `manifest.json`도 함께 생성된다. 기존 Chromium을 사용하려면 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`에 실행 파일 경로를 지정한다.

캡처 대상과 화면 크기는 [capture-ui.mjs](scripts/capture-ui.mjs)에서 관리한다. UI 구조·진입 경로·주요 상태·반응형 배치가 바뀌면 시나리오와 이 설명도 함께 확인한다. 캡처 보드는 시각 비교용이며 인터랙션 검증을 대신하지 않는다.

## 프로젝트 구조

- `src/components/`: App Shell, 플레이어와 공통 UI
- `src/pages/`: 화면별 구성
- `src/mocks/`: 가상 데이터와 프론트엔드 상태
- `src/layout/`: 공통 화면 모드 Provider
- `src/i18n/`: 영어 사전과 언어 Provider
- `src/styles/global.css`: 디자인 토큰과 전역 스타일
- `src/utils/`: 공통 모션 설정
- `public/licenses/`: 폰트 라이선스

제품 범위와 UX는 [PRODUCT.md](PRODUCT.md), 디자인과 반응형 규칙은 [DESIGN.md](DESIGN.md), 작업 원칙은 [AGENTS.md](AGENTS.md)를 따른다.
