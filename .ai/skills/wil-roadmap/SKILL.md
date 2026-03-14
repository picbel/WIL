---
name: wil-roadmap
description: 학습 이력을 분석하여 다음 학습 방향을 추천합니다. `/wil-roadmap` 명령어를 지원합니다.
---

# WIL Roadmap Skill

이 스킬은 `keywords`와 주제를 분석하여 최적의 학습 로드맵을 제안합니다.

## Command

### `/wil-roadmap`
- **목적**: 지금까지의 학습 흐름을 파악하고 부족한 영역이나 심화 학습 기술 추천.
- **동작**: 최근 `wil.md` 파일들의 메타데이터와 본문을 분석하여 기술적 연관성이 높은 다음 단계를 제시합니다.

## Guidance
- 파일 구조는 [references/format.md](references/format.md)를 참조하세요.
- 사용자의 관심사(keywords) 변화를 감지하여 유연한 추천을 제공하세요.
