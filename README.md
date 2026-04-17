<h1><img src="https://raw.githubusercontent.com/prmate/prmate/master/icon.svg" height="28" align="absmiddle" alt="PRmate icon"> PRmate — 한국어 AI 코드 리뷰</h1>

> **GitHub PR이 열리면 자동으로 한국어로 코드 리뷰 코멘트를 게시합니다.**
> 우아한테크코스, 네이버 Hackday, 토스 Frontend Fundamentals 등 **공식 공개** 컨벤션 프리셋 내장.

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-PRmate-blue?logo=github)](https://github.com/marketplace/actions/prmate-ai)
[![Claude Sonnet 4.6](https://img.shields.io/badge/Claude-Sonnet%204.6-purple)](https://www.anthropic.com)

---

## 🎯 왜 PRmate인가?

| 특징 | 설명 |
|------|------|
| 🇰🇷 **처음부터 한국어 설계** | 번역체 없는 자연스러운 한국어 리뷰 |
| 🏢 **공식 컨벤션만** | 우아한테크코스 · 네이버 Hackday · 토스 Frontend Fundamentals (공개 자료 기반) |
| ⚡ **5분 설치** | YAML 한 줄이면 끝 |
| 🔒 **Zero Data Retention** | 코드 서버 미저장, 메모리 처리 후 즉시 삭제 |
| 💰 **비용 최적화** | Prompt Caching으로 토큰 비용 50~90% 절감 |
| 🛡️ **비밀 자동 마스킹** | API 키 / 토큰 / 비밀번호 자동 [REDACTED] |
| 📖 **출처 투명 공개** | 모든 컨벤션에 공식 문서 링크 명시 |

---

## 🚀 4단계로 시작

### 1단계: API 키 등록

1. [console.anthropic.com](https://console.anthropic.com)에서 API 키 발급
2. 자기 레포 → **Settings** → **Secrets and variables** → **Actions**
3. Name: `ANTHROPIC_API_KEY`, Value: 발급받은 키

### 2단계: 워크플로우 파일 추가

`.github/workflows/review.yml` 파일 생성:

```yaml
name: PR 코드 리뷰

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

permissions:
  pull-requests: write
  contents: read

jobs:
  review:
    if: github.event.pull_request.draft == false
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: prmate/prmate@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

### 3단계: 상세 설정 (`.prmate.yml`)

레포 루트에 `.prmate.yml` 파일을 만들어 세부 설정합니다. 없으면 기본값이 사용됩니다.

```yaml
enabled: true                 # 전체 On/Off (Kill switch)

language: ko                  # ko | en
convention: naver             # default | woowa | naver | toss | custom
review_level: standard        # strict | standard | relaxed

model: sonnet                 # sonnet (권장) | haiku (빠름, 저렴)
mixed_language: false         # 코드는 영어, 설명은 한국어
dry_run: false                # 실제 게시 없이 로그만

max_files_per_pr: 20          # PR당 최대 리뷰 파일 수

exclude_paths:
  - "*.md"
  - "docs/**"
  - "*.lock"
  - "*.test.ts"

# 파일 타입별 세부 규칙
rules:
  - pattern: "src/**/*.ts"
    review_level: strict
  - pattern: "*.spec.ts"
    enabled: false

# 커스텀 프롬프트 주입
custom_prompt: |
  우리 팀은 함수형 프로그래밍 원칙을 중시합니다.
  가변 상태(mutation) 사용을 강하게 지적해주세요.

# Slack / Discord 알림 (선택)
notifications:
  slack:
    webhook_url_secret: SLACK_WEBHOOK_URL   # GitHub Secret 이름
    on_events: [review_completed, review_failed]
    mention: "@channel"                     # 선택사항
  discord:
    webhook_url_secret: DISCORD_WEBHOOK_URL # GitHub Secret 이름
    on_events: [review_completed, review_failed]
```

### 4단계: PR 열기 → 자동 리뷰 확인 🎉

PR을 열면 2~3분 내 한국어 리뷰 코멘트가 자동으로 게시됩니다.

---

## 🇰🇷 컨벤션 프리셋 (5종 — 모두 공식 공개 자료 기반)

| 값 | 이름 | 공식 출처 | 주요 언어 |
|----|------|----------|----------|
| `default` | 클린 코드 | Robert C. Martin 일반 원칙 | 모든 언어 |
| `woowa` | 우아한테크코스 | [woowacourse-docs/styleguide](https://github.com/woowacourse/woowacourse-docs/tree/main/styleguide) | Java (Google Style 기반) |
| `naver` | 네이버 Hackday | [naver.github.io/hackday-conventions-java](https://naver.github.io/hackday-conventions-java/) | Java (Checkstyle XML 포함) |
| `toss` | 토스 Frontend Fundamentals | [frontend-fundamentals.com](https://frontend-fundamentals.com/code-quality/) | TypeScript/JavaScript |
| `custom` | 팀 자체 | `convention_file`로 `.md` 주입 | - |

팀 내부 규칙이 있다면 커스텀 방식을 사용하세요.

### 커스텀 컨벤션 사용
```yaml
# .prmate.yml
convention: custom
convention_file: .prmate/our-style.md
```

`.prmate/our-style.md`에 팀 규칙을 자유롭게 Markdown으로 작성하면 됩니다.

---

## 🔌 Action Inputs

| Input | 설명 | 필수 | 기본값 |
|-------|------|------|--------|
| `anthropic_api_key` | Anthropic API 키 | ✅ | - |
| `github_token` | GitHub 토큰 | ❌ | `github.token` |
| `config_path` | 설정 파일 경로 | ❌ | `.prmate.yml` |
| `claude_model` | Claude 모델 | ❌ | `claude-sonnet-4-6` |
| `timeout_ms` | 타임아웃 (ms) | ❌ | `240000` |

## 📤 Action Outputs

| Output | 설명 |
|--------|------|
| `review_url` | 게시된 리뷰 코멘트 URL |
| `tokens_used` | 사용 토큰 수 (입력+출력) |

---

## 🛑 리뷰 건너뛰기

### PR 제목에 `[skip review]` 포함
```
fix(wip): [skip review] 아직 미완성
```

### PR을 Draft로 전환
GitHub PR 페이지 → Convert to draft

### `.prmate.yml`로 비활성화
```yaml
enabled: false
```

### 특정 파일 제외
```yaml
exclude_paths:
  - "vendor/**"
  - "experimental/**"
```

---

## 🔔 Slack / Discord 알림

리뷰 완료 또는 실패 시 팀 채널로 알림을 전송할 수 있습니다.

### 1. Webhook URL을 GitHub Secret에 등록

레포 → **Settings** → **Secrets and variables** → **Actions** → New secret

| Secret 이름 | 값 |
|------------|-----|
| `SLACK_WEBHOOK_URL` | Slack Incoming Webhook URL |
| `DISCORD_WEBHOOK_URL` | Discord Webhook URL |

### 2. `.prmate.yml`에 알림 설정 추가

```yaml
notifications:
  slack:
    webhook_url_secret: SLACK_WEBHOOK_URL   # 위에서 등록한 Secret 이름
    on_events: [review_completed, review_failed]
    mention: "@channel"                     # 선택: 멘션할 대상

  discord:
    webhook_url_secret: DISCORD_WEBHOOK_URL
    on_events: [review_completed, review_failed]
```

### 알림 내용

**리뷰 완료 시:**
- 저장소명, PR 링크
- 분석 파일 수, 비용

**리뷰 실패 시:**
- 오류 유형, 오류 내용

> Slack은 Incoming Webhooks 앱을, Discord는 채널 설정 → 연동 → 웹후크에서 URL을 발급받을 수 있습니다.

---

## ❓ 자주 묻는 질문

<details>
<summary><b>Q: 코드가 서버에 저장되나요?</b></summary>

아니요. Zero Data Retention 정책으로 코드는 메모리에서 처리 후 즉시 삭제됩니다. PR diff만 추출하여 분석하며, 전체 레포지토리에 접근하지 않습니다.
</details>

<details>
<summary><b>Q: CodeRabbit과 무엇이 다른가요?</b></summary>

CodeRabbit은 `language: ko` 설정이 있지만 실제로는 영어 리뷰가 많이 나온다는 불만이 있습니다. PRmate는 처음부터 한국어 리뷰를 위해 설계되었으며, 우아한테크코스 · 네이버 Hackday · 토스 Frontend Fundamentals 등 국내 공식 컨벤션 5종을 기본 제공합니다.
</details>

<details>
<summary><b>Q: 어떤 언어를 지원하나요?</b></summary>

JavaScript, TypeScript, Python, Java, Go, Kotlin, Rust, Ruby, Swift, C# 등 주요 언어 전부 지원.
</details>

<details>
<summary><b>Q: 리뷰 비용이 얼마나 드나요?</b></summary>

PR 1건당 평균 **$0.01 ~ $0.05** (≈ ₩15~70). Prompt Caching 활용 시 50~90% 절감.
</details>

<details>
<summary><b>Q: 리뷰 건너뛰기 가능한가요?</b></summary>

3가지 방법:
1. PR 제목에 `[skip review]` 포함
2. PR을 Draft로 전환
3. `.prmate.yml`에 `enabled: false`
</details>

<details>
<summary><b>Q: 대기업/엔터프라이즈 지원은?</b></summary>

전담 지원 및 커스텀 컨벤션 제작 가능. [문의하기](mailto:contact@prmate.me)
</details>

---

## 🔗 링크

- 🌐 **공식 사이트**: [prmate.me](https://prmate.me)
- 📦 **Marketplace**: [github.com/marketplace/actions/prmate-ai](https://github.com/marketplace/actions/prmate-ai)
- 🐛 **버그 리포트**: [Issues](https://github.com/prmate/prmate/issues)
- 💡 **기능 제안**: [Discussions](https://github.com/prmate/prmate/discussions)

---

*PRmate — 한국 개발자를 위해, 한국 개발자가 만든 코드 리뷰 도구* 🇰🇷
