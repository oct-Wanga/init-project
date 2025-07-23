# 🔖 Enterprise Portal (ShowRoom) FE

> LG AI 연구원 포털 시스템 FE 서비스 구현

---

## 📖 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [폴더 구조](#폴더-구조)
4. [설치 및 실행](#설치-및-실행)

- [사전 요구사항](#사전-요구사항)
- [설치 방법](#설치-방법)
- [개발 서버 실행](#개발-서버-실행)
- [https 실행](#https-실행)

5. [주요 기능](#주요-기능)
6. [사용된 라이브러리 및 설정](#사용된-라이브러리-및-설정)
7. [테스트](#테스트)
8. [배포](#배포)
9. [컨트리뷰션](#컨트리뷰션)
10. [연락처](#연락처)

---

## 📝프로젝트 소개

- **목적**: LG AI 서비스를 이용하기 위한 포털
- **기간**: 2025.03 ~
- **주요 기능**:
  - 각 종 서비스 소개 및 신청
  - 언어 ko/en 지원
  - 반응형 모바일 지원

---

## 🚀기술 스택

| 구분        | 기술                               |
|-----------|----------------------------------|
| Framework | Next.js 14 (App Router)          |
| 언어        | TypeScript, React 18             |
| 스타일링      | CSS Modules                      |
| 상태 관리     | Zustand                          |
| 데이터 페칭    | Axios, React-Query               |
| 인터렉션      | framer-motion                    |
| 아이콘       | svg-sprite-loader, @svgr/webpack |
| 테스트       | Jest, React Testing Library      |
| 배포        | Docker, GitLab CICD              |

---

## 📂폴더 구조

```bash
.
├── public/              # 정적 파일 (favicon, 이미지 등)
├── scripts/             # svg-sprite-loader/svgr-webpack을 위한 스크립트
├── src/                 # 실제 앱 로직
└── .env                 # 각 환경별 환경변수
````

---------------------------------------------------------------------------------

```bash
src/
├── app/
│   ├── [locale]/                 # 언어 기반으로 URL 구성 및 페이지 구성
│   │    ├── (main)/              # layout 으로 인해 구분
│   │    │   ├── chatexaone/      
│   │    │   │   ├── _component/  # chatexaone 페이지 내에서만 사용된 컴포넌트
│   │    │   │   └── page.tsx     # chatexaone 페이지
│   │    │   └── ...
│   │    ├── api/           # Notification SSE 환경 구성
│   │    └── ...           
│   ├── _component/         # 전역 컴포넌트 
│   ├── _hook/              # 공용 custom hook 및 test 코드 
│   ├── _styles/            # global.css
│   ├── health/             # k8s 헬스체크용 페이지
│   ├── layout.tsx          # 전역 레이아웃
│   └── not-found.tsx       # 404
├── assets/
│   └── icons/              # Icon 이미지
├── constants/              # 상수값 정의
├── i18n/
│   ├── navigation.ts       # 프로젝트 내 사용되는 라우트 변경
│   ├── request.ts          # 언어.json 파일 설정
│   └── routing.ts          # 언어 설정
├── lib/
│   ├── CheckLanguage.ts    # 현재 언어 값 추출
│   ├── CustomAxios.ts      # axios 설정
│   ├── GlobalRenderer.tsx  # modal, toast 최상단에 render
│   ├── ReactQuery....tsx   # React-Query 설정
│   ├── SpriteRenderer.tsx  # Icon svg파일들 sprite 설정
│   └── VaildTerms.ts       # 최신 약관 추출
├── messages/
│   ├── en.json             # 영어 
│   └── ko.json             # 국문
├── services/
│   ├── api/                # axios api 호출 함수
│   ├── interface/          # api 타입
│   └── query/              # react-query 사용된 hook
├── store/                  # zustand store
├── type/                   # 컴포넌트 내 필요한 타입
└── middleware.ts           # 페이지 접근 조건 및 언어 적용 
```

---

## ⚙️설치 및 실행

### 사전 요구사항

* Node.js ≥ 20
* npm ≥ 10

### 설치 방법

```bash
git clone git@gitlab.lgair.net:exaone/enterprise-portal-fe.git
npm install
```

### 개발 서버 실행

```bash
npm dev
# http://localhost:3000 으로 접속
```

### https 실행

API 통신을 위함

Auth 서비스 로그인 통해 할당 받은 JWT 사용을 위해서 localhost를 https환경으로 실행

쿠키의 도메인을 맞춰서 https로 localhost를 실행할 수 있음

PC mkcert 설치 필요 (https://github.com/FiloSottile/mkcert)

* window
  * C:\Windows\System32\drivers\etc 경로 이동
  * hosts 관리자권한으로 실행
  * 127.0.0.1 local.lgresearch.net 추가
  * https://local.lgresearch.net:3000 으로 실행
* mac
  * /etc/hosts
  * 127.0.0.1 local.lgresearch.net 추가
  * https://local.lgresearch.net:3000 으로 실행

---

## ✨주요 기능

### 1. 로그인/회원가입

* Auth Service 로그인/회원가입을 통해 이용 가능
* JWT 기반 인증으로 도메인을 맞춰 토큰 공유 (헤더 설정 필요 없음)

### 2. 각 종 서비스 소개

* 각 탭에 맞게 AI 서비스 소개 및 서비스 이용 신청
* 필요에 따라 인터렉션 구현

### 3. 문의하기

* 서비스 이용에 있어 문의

### 4. 계정 관리

* 간단한 계정 정보 및 신청한 서비스 목록 확인
* 자세한 계정 관리는 `계정 관리하기` 버튼을 통해 `Auth/Mypage` 로 이동

### 5. 언어

* 국문/영문 언어 지원

### 6. 알람

* SSE로 구현하여 약 5초에 한번씩 알람 API 호출하여 업데이트

### 7. 공통 Modal, Toast 컴포넌트

* Zustand Store 로 내부 상태 관리

---

## 🔧사용된 라이브러리 및 설정

* Axios: `/lib/CustomAxios.ts` 에서 기본 설정 및 인터셉터
* React-Query: 데이터 캐싱, 쿼리 키 관리
* Zustand: 전역 상태(store) 분리
* svg-sprite-loader & SVGR: SVG 아이콘 sprite 및 React 컴포넌트 변환
* Jest & React Testing Library: 단위 테스트 및 스냅샷 테스트
* next-intl: en/ko 언어 적용으로 인해 `/i18n/` 경로에 언어 관련 함수 정의 및 설정

---

## ✅테스트

```bash
# 단위 테스트 실행
npm test
# 커버리지 보고서
npm test -- --coverage
```

---

## 🚀배포

* `dockerfile`을 통해 컨테이너화
* `.gitlab-ci.yaml ` 통해 develop 브랜치 merge 후 자동 배포 설정
* 환경 별 .env 파일 필요

---

## 🤝컨트리뷰션

1. Fork 프로젝트
2. 브랜치 생성 (git checkout -b feature/기능-설명 또는 jira 이슈 넘버)
3. 커밋 (`.gitmessage.txt` 양식에 맞춰 작성)
4. 푸시 및 gitlab MR 생성

---

## 📬연락처

* 담당자: 데이타솔루션