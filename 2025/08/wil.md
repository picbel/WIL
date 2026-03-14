---
description: Week I Learnt
keywords: [study, til, lwil]
---

# 2025년 8월

[이전 달](../07/wil.md)
[다음 달](../09/wil.md)

## 목차
- [18일](#18일)
  - [Amazon ElastiCache (Redis)사용시 클러스터 모드의 failover 테스트방법](#amazon-elasticache-redis사용시-클러스터-모드의-failover-테스트방법)
- [24일](#24일)
  - [socket timeout? read timeout?](#socket-timeout-read-timeout)
- [27일](#27일)
  - [코틀린 멀티플랫폼 대응되는 AtomicFU](#코틀린-멀티플랫폼-대응되는-atomicfu)

---

<a name="18일"></a>
## 18일

### Amazon ElastiCache (Redis)사용시 클러스터 모드의 failover 테스트방법
```sh
aws elasticache test-failover \
  --replication-group-id my-redis-cluster \
  --node-group-id 0001
```
예시 설명
--replication-group-id my-redis-cluster: 이 부분은 장애 조치를 테스트할 Redis 복제 그룹의 ID를 지정한다. 실제 사용 시에는 my-redis-cluster 대신 사용하려는 복제 그룹의 이름을 입력해야 합니다.  
--node-group-id 0001: 복제 그룹 내에서 장애 조치를 유도할 특정 노드 그룹의 ID를 지정합니다. Redis 클러스터 모드를 사용하지 않는 복제 그룹은 단일 노드 그룹(0001)을 가집니다.

---

<a name="24일"></a>
## 24일

### socket timeout? read timeout?
타임아웃 정리한거  
[2025/06/wil.md#타임아웃의-종류-정의](../06/wil.md#타임아웃의-종류-정의)

---

<a name="27일"></a>
## 27일

### 코틀린 멀티플랫폼 대응되는 AtomicFU
