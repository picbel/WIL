---
description: Week I Learnt
keywords: [study, til, lwil]
---

# 2025년 11월

[이전 달](../10/wil.md)
[다음 달](../12/wil.md)

## 목차
- [21일](#21일)

---

<a name="21일"></a>
## 21일

### MDC(Mapped Diagnostic Context) 이해하기

**MDC(Mapped Diagnostic Context)** 는 로깅 프레임워크(SLF4J, Logback, Log4j2 등)에서 제공하는 기능으로, 현재 실행 중인 스레드에 컨텍스트 정보를 담아 로그 메시지에 자동으로 포함시킬 수 있게 해줍니다. 마이크로서비스 아키텍처나 멀티스레드 환경에서 요청별 추적(Tracing)을 위해 필수적으로 사용됩니다.

#### 핵심 특징
- **ThreadLocal 기반**: 내부적으로 `ThreadLocal`을 사용하여 데이터를 관리하므로, 동일한 스레드 내에서는 어디서든 접근이 가능합니다.
- **키-값(Map) 구조**: 여러 개의 정보를 키-값 쌍으로 저장할 수 있습니다 (예: `requestId`, `userId`).
- **자동 로그 포함**: 로그 레이아웃 설정(`logback.xml` 등)에서 `%X{key}` 형식을 사용하여 로그마다 특정 정보를 출력하도록 설정할 수 있습니다.

#### 주요 베스트 프랙티스
1.  **반드시 Clear 처리**: `ThreadLocal` 기반이므로 스레드 풀 환경에서 데이터 오염을 막기 위해 사용 후 `MDC.clear()` 또는 `MDC.remove()`를 명시적으로 호출해야 합니다 (`try-finally` 블록 권장).
2.  **비동기 처리 시 전파**: 새로운 스레드를 생성하거나 `ExecutorService`를 사용할 때 MDC 데이터는 자동으로 복사되지 않습니다. `MDC.getCopyOfContextMap()`을 통해 직접 전달해야 합니다.
3.  **Kotlin Coroutines**: `kotlinx-coroutines-slf4j` 라이브러리의 `MDCContext()`를 사용하여 코루틴 일시 중단 및 재개 시에도 MDC를 유지할 수 있습니다.

#### 코드 예시 (Java/Kotlin)

```kotlin
// MDC 설정 및 사용
try {
    MDC.put("requestId", UUID.randomUUID().toString())
    MDC.put("userId", user.id)
    
    logger.info("비즈니스 로직 실행") // 로그에 requestId와 userId가 포함됨
} finally {
    MDC.clear() // 필수: 스레드 반환 전 정리
}

// Coroutines에서의 활용
withContext(Dispatchers.IO + MDCContext()) {
    logger.info("비동기 작업 중에도 컨텍스트 유지")
}
```
