---
name: wil-quiz
description: WIL 학습 내용을 바탕으로 복습용 퀴즈를 생성합니다. `/wil-quiz [topic/period]` 명령어를 지원합니다.
---

# WIL Quiz Skill

이 스킬은 학습 데이터를 파싱하여 기술 복습을 위한 퀴즈를 생성합니다.

## Command

### `/wil-quiz [topic/period]`
- **목적**: 특정 주제나 기간의 상세 내용을 기반으로 퀴즈 생성.
- **동작**: 객관식 3문제, 주관식 2문제를 생성하며 정답은 사용자가 요청할 때만 공개합니다.

## Guidance
- 파일 구조는 [references/format.md](references/format.md)를 참조하세요.
- 코드 블록이나 "주의사항" 섹션을 활용하여 변별력 있는 문제를 만드세요.
