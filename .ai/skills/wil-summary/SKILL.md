---
name: wil-summary
description: WIL 데이터를 분석하여 특정 기간의 학습 내용을 요약합니다. `/wil-summary [period]` 명령어를 지원합니다.
---

# WIL Summary Skill

이 스킬은 특정 기간(월 또는 연도)의 `wil.md` 파일을 읽어 핵심 학습 주제를 요약합니다.

## Command

### `/wil-summary [period]`
- **목적**: 특정 기간의 학습 주제를 리스트 형태로 요약 제공.
- **동작**: `YYYY/MM/wil.md`에서 `### 주제`들을 추출하고, 각각에 대해 3줄 이내의 핵심 요약을 수행합니다.

## Guidance
- 파일 구조는 [references/format.md](references/format.md)를 참조하세요.
- 요약 시 원문의 전문 용어와 핵심 개념을 보존하세요.
