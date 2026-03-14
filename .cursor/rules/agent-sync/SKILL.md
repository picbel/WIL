---
name: agent-sync
description: Gemini, Claude, Cursor 등 여러 에이전트 간의 스킬 폴더를 상호 동기화(Broadcast)합니다. `/스킬동기화` 명령어를 지원합니다.
---

# Agent Sync (Broadcast Mode)

프로젝트 내의 여러 AI 에이전트 환경(Gemini, Claude, Cursor 등) 중 한 곳에서 스킬이 업데이트되면, 이를 다른 모든 에이전트 폴더로 즉시 전파합니다.

## 동기화 원리

이 스킬은 실행되는 `sync.cjs` 스크립트의 실제 위치를 기반으로 **소스(Source)** 폴더를 자동 감지하며, 감지된 소스를 제외한 나머지 모든 에이전트 폴더를 **대상(Target)**으로 삼아 모든 스킬을 복사합니다.

### 대상 에이전트 경로 리스트
- `.gemini/skills/` (Gemini CLI)
- `.claude/skills/` (Claude Code)
- `.ai/skills/` (General AI)
- `.cursor/rules/` (Cursor / Codex)

## 사용 방법

동기화가 필요할 때, 현재 에이전트의 스킬 디렉토리 내에 있는 동기화 스크립트를 실행하십시오.

### 자동 브로드캐스트 실행
인자 없이 실행하면 현재 위치를 자동으로 파악하여 다른 모든 곳을 업데이트합니다.
```bash
node <현재_에이전트_경로>/agent-sync/scripts/sync.cjs
```
*(예: Gemini에서는 `.gemini/skills/agent-sync/scripts/sync.cjs` 실행)*
*(예: Claude Code에서는 `.claude/skills/agent-sync/scripts/sync.cjs` 실행)*

> **⚠️ 권장 사항**: 새로운 스킬을 생성하거나 기존 스킬을 수정한 직후에는 반드시 이 동기화 명령을 실행하여 모든 에이전트의 지식 수준을 동일하게 유지하십시오.

## 주의 사항
- 동일한 이름의 스킬 폴더는 대상 디렉토리에서 무조건 덮어씌워집니다.
- 동기화 완료 후 각 에이전트에서 스킬 목록을 새로고침하십시오 (예: `/skills reload`).
