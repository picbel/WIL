---
description: Week I Learnt
keywords: [study, til, lwil]
---

# 2025년 9월

[이전 달](../08/wil.md)
[다음 달](../11/wil.md)

## 목차
- [2일](#2일)
  - [Spring Batch 구조](#spring-batch-구조)
- [10일](#10일)
  - [Jpa @OrderBy 등](#jpa-orderby-등)
- [18일](#18일)
  - [Spring Page 어노테이션](#spring-page-어노테이션)

---

<a name="2일"></a>
## 2일

### Spring Batch 구조

---


<a name="10일"></a>
## 10일

### Jpa @OrderBy 등

현재 프로젝트에서 JPA연관관계를 사용하기로 하였는데
oneToMany관계에서 List를 쓸지 Set을쓸지 혹은 SortedSet을쓸지 컨벤션을 어떤방법으로 안내할지가 정해지지않아서요
이번기회에 정하면 좋을것 같습니다

일단 List의 문제점은  2개이상의 List로 관리되는 Many측 연관관계를 fetch join하면 MultipleBagFetchException이 발생합니다,

연관관계를 사용하는 이상 fetch join을 사용 안할수는없을꺼같아서 개인적인 의견이지만 Set을 사용하는방법이 좋을것 같습니다
내용은 MR에 첨부 하였습니다.
아론님이 애기해주셧는데 Set을 쓰면 순서 유지가 안되는것은 @OrderBy 를 통해서 해결하는 방향이면 좋을것같습니다.
(하이버네이트 고유 구현을 쓰는거라 하이버네이트에 종속된다는 문제점이 있긴합니다 -> jakarta.persistence 패키지쪽이었네요)

네 엄밀히 애기하면 jpa스펙은 아니고 하이버네이트 스펙이긴합니다
하이버네이트에선 PersistentSet의 구현체를 linkedhashset으로 해서 보장하는것 같더라구요

저희가 class단에서도 순서를 보장해야할때만 sortedSet을 이용해서 보장하고 단순한 상황에서는 set + orderBy사용하면되지않을까 싶습니다

이전 하이버네이트에서 사용하던 orderby는 (6.6기준 Deprecated입니다)
https://docs.jboss.org/hibernate/orm/6.6/javadocs/org/hibernate/annotations/OrderBy.html
If the collection is a Set or Map, the order is maintained using a LinkedHashSet or LinkedHashMap. If the collection is a bag or List, the order is maintained by the underlying ArrayList.을 통해 set에서도 순서 유지를 해줫는데

자카르타 스펙으로 사용하게되면서 이 부분이 유지되는지 아닌지 공식문서를 못찾겟네요;

이거 찜찜해서
현재 프로젝트 기준 실제로 꽂힌 PersistentSet 파일의 내부 set 구현체를 print찍어보았는데
PersistentSet runtime type = org.hibernate.collection.spi.PersistentSet
Underlying Set impl       = java.util.LinkedHashSet
size=1으로 출력되네요
일단 현재 orderBy붙히면 LinkedHashSet으로 순서 유지해줍니다

직접 출력해보실분들은 아래 코드로 찍어보시면됩니다
fun printUnderlyingSetImpl(persistent: Set<*>) {
                // 1) 강제 초기화 (세션이 열려 있어야 함)
                Hibernate.initialize(persistent)

                // 2) PersistentSet인지 확인
                if (persistent !is PersistentSet<*>) {
                    println("Not a PersistentSet: ${persistent.javaClass.name}")
                    return
                }

                // 3) 리플렉션으로 protected 필드 'set' 접근
                val field = persistent.javaClass.getDeclaredField("set").apply { isAccessible = true }
                val underlying = field.get(persistent) as? Set<*>

                println("PersistentSet runtime type = ${persistent.javaClass.name}")
                println("Underlying Set impl       = ${underlying?.javaClass?.name}")
                println("size=${underlying?.size}")
                underlying?.take(5)?.forEachIndexed { i, e -> println("[$i] $e") }
            }

---


<a name="18일"></a>
## 18일

### Spring Page 어노테이션
