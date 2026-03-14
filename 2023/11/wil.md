---
description: Last Week I Learnt
keywords: [study, til, lwil]
---

[다음 달](https://github.com/picbel/WIL/blob/main/2023/12/wil.md)

# 2023년 11월

## 목차
- [16일](#16일)
  - [Spring IoC 컨테이너 및 빈 소개](#spring-ioc-컨테이너-및-빈-소개)
  - [ApplicationContext의 확장 기능](#applicationcontext의-확장-기능)
- [22일](#22일)
  - [Spring 의존성 주입 (Dependency Injection)](#spring-의존성-주입-dependency-injection)
  - [DI의 주요 방식 및 권장 사항](#di의-주요-방식-및-권장-사항)
  - [빈 등록 방법 (BeanDefinition)](#빈-등록-방법-beandefinition)
- [26일](#26일)
  - [Bean 초기화 및 지연 로딩 (depends-on, Lazy-init)](#bean-초기화-및-지연-로딩-depends-on-lazy-init)
- [30일](#30일)
  - [Lookup Method Injection (메서드 주입)](#lookup-method-injection-메서드-주입)

---

<a name="16일"></a>
## 16일

### Spring IoC 컨테이너 및 빈 소개

Spring 프레임워크의 핵심인 IoC(Inversion of Control) 컨테이너와 Bean의 개념을 정리합니다. 

IoC는 객체의 생성과 의존성 관리의 주도권을 개발자가 아닌 프레임워크(컨테이너)가 갖는 제어의 역전을 의미하며, 이를 실현하는 핵심 메커니즘이 DI(Dependency Injection)입니다.

> **DI (Dependency Injection)**: 객체가 자신의 의존성을 직접 생성하거나 관리하지 않고, 생성자나 팩토리 메서드 등을 통해 외부(컨테이너)로부터 주입받는 방식입니다. 이는 객체 간의 결합도를 낮추고 테스트 용이성을 높이는 핵심 원칙입니다.

#### 핵심 용어 정리
- **IoC (Inversion of Control)**: 소프트웨어 컴포넌트 간의 제어 흐름을 외부 컨테이너로 위임하는 설계 원칙입니다.
- **Bean**: Spring IoC 컨테이너가 관리하는 자바 객체를 의미합니다.

<!-- ORIGINAL_START
### Spring IoC 컨테이너 및 빈 소개
최근 스프링 공식문서를 번역해보면서 공부중인데 사소한 디테일까지 알게되는것 같아 생각보다 재미있다.  
오늘 요약할것은 `Spring IoC 컨테이너 및 빈 소개` 글인데 내용을 간단히 요약하면 다음과 같다.

> DI는 객체가 스스로 종속성을 관리하는 대신 생성자 인수, 팩토리 메서드 인수 등 속성 설정을 통해 종속성을 정의하고, 컨테이너가 bean을 생성할 때 이러한 종속성을 주입하는 프로세스입니다. 이것은 bean이 종속성을 직접 생성하거나 Service Locator 패턴과 같은 메커니즘을 사용하여 관리하는것과 정반대의 원칙입니다.

```text
용어 정리
IOC (Inversion of Control):
IOC는 제어의 역전을 의미하며, 소프트웨어 컴포넌트 간의 제어 흐름의 역전을 말합니다. 객체 스스로가 제어의 주체가 되는 것이 아니라 외부 컨테이너나 프레임워크에 의해 제어의 주체가 바뀌는 것을 의미합니다. 

DI (Dependency Injection):
DI는 의존성 주입을 나타내며, 한 객체가 다른 객체에 필요한 의존성을 주입받는 것을 의미합니다. 즉, 객체가 직접 필요한 다른 객체를 생성하지 않고 외부에서 의존성을 주입받는 것입니다. 이를 통해 객체 간의 결합도를 낮출 수 있고, 테스트하기 쉬운 코드를 작성할 수 있습니다.
```
ORIGINAL_END -->

---

### ApplicationContext의 확장 기능

`ApplicationContext`는 `BeanFactory`의 하위 인터페이스로, 기본적인 빈 관리 기능 외에 엔터프라이즈 애플리케이션 개발에 필요한 고차원적인 기능을 추가로 제공합니다.

- **AOP 통합**: Spring AOP 기능과의 손쉬운 통합 지원
- **MessageSource (i18n)**: 국제화를 위한 메시지 리소스 처리
- **Event Publication**: 애플리케이션 이벤트 발행 및 리스닝 메커니즘
- **Resource Loading**: 파일, URL 등 다양한 리소스를 추상화된 방식으로 로드
- **Specific Contexts**: 웹 환경을 위한 `WebApplicationContext` 등 환경 맞춤형 컨텍스트 제공

<!-- ORIGINAL_START
### ApplicationContext는

ApplicationContext는 BeanFactory의 하위 인터페이스이다. 다음 기능이 추가되었다 보면됩니다.
- Easier integration with Spring’s AOP features (스프링 Aop와 더 쉬운 통합)
- Message resource handling (for use in internationalization) (메시지 리소스 처리)
- Event publication (이벤트 개시)
- Application-layer specific contexts such as the WebApplicationContext for use in web applications. (웹 응용 프로그램에서 사용하는 `WebApplicationContext`와 같은 응용 프로그램 레이어별 특정 컨텍스트.)
ORIGINAL_END -->

---

<a name="22일"></a>
## 22일

### Spring 의존성 주입 (Dependency Injection)

의존성 주입(DI)은 객체가 협력하는 다른 객체를 직접 생성하지 않고, 컨테이너가 런타임에 이를 제공하도록 하는 프로세스입니다. 이를 통해 코드의 결합도를 낮추고 유연성과 테스트 용이성을 극대화할 수 있습니다.

#### DI의 주요 방식 및 권장 사항

1. **생성자 기반 주입 (Constructor-based DI)**: 스프링이 공식적으로 권장하는 방식입니다.
   - **불변성 보장**: 필드를 `final`로 선언하여 객체의 불변성을 유지할 수 있습니다.
   - **누락 방지**: 필수 의존성이 주입되지 않으면 컴파일 시점이나 애플리케이션 구동 시점에 오류를 발견할 수 있습니다.
   - **단일 책임 원칙(SRP)**: 생성자 인수가 너무 많아지는 것을 통해 클래스의 비대함을 조기에 감지할 수 있습니다.

2. **세터 기반 주입 (Setter-based DI)**: 선택적인 의존성이나 런타임 시 의존성 변경이 필요한 경우 사용합니다.
   - 클래스 내에 합리적인 기본값을 설정할 수 있는 경우에 권장됩니다.
   - 순환 의존성 해결이 불가피한 경우 대안으로 활용될 수 있으나, 가급적 설계를 개선하는 것이 우선입니다.

<!-- ORIGINAL_START
### 스프링의 DI

의존성 주입 관련 공식문서를 번역하였는데 해당 문서를 읽으며 기억할만한 부분을 간단히 메모하여보겠습니다.  
스프링 Dependency Injection 문서에서 DI를 설명하는것을 요약하면 다음과 같습니다.
> Dependency Injection은 객체가 자신과 작업하는 다른객체(협업하는 객체)를 생성자, 팩토리 메서드 인수, 객체 인스턴스가 생성된 후에 설정된 속성(정보)를 통해 정의하는 프로세스입니다. 그런다음 컨테이너가 Bean을 생성할 때 이러한 의존성을 주입합니다.  
스프링에선 DI를 하면 장점을 코드가 더 깔끔하고, 결합도를 효과적으로 낮출 수 있고 테스트하기도 더 쉬워진다고 합니다.

---

### DI의 2가지 방법
크게 2가지 방법이 있는데 `생성자 기반 의존성 주입(Constructor-based dependency injection)` 과 `세터 기반 의존성 주입(Setter-based dependency injection)` 가 있습니다.

스프링은 2가지 방법중 권장하는 방법은 `생성자 기반 의존성 주입(Constructor-based dependency injection)` 입니다.
다음과 같은 이유로 생성자 기반 의존성 주입을 권장합니다.
1. 애플리케이션 구성요소를 변경할 수 없는 불변객체로 구현하고 필수 의존성이 null이 아님을 보장할 수 있습니다.
2. 생성자 주입된 구성 요소는 완전히 초기화된 상태입니다.
3. 생성자 인수가 너무 많은 것은 좋지않은 코드의 징후이다. 미리 확인 할 수 있다.

`세터 기반 의존성 주입(Setter-based dependency injection)` 을 사용하는 경우도 있는데 아래와 같습니다.
1. 클래스내에서 합리적인 기본값을 할당할 수 있는 선택적 의존성에 사용하여야한다. (그래야 사용시 null체크를 하지 않아도 됨)
2. 필수불가결하게 순환 의존성(Circular dependencies)을 만들어야 하는경우 (권장하는 방법은 아님)

```text
순환 의존성(Circular dependencies)
classA가 classB를 참조하고 classB가 classA참조하는 이런 순환형 구조
```
ORIGINAL_END -->

### 빈 의존성 해결 프로세스 (Dependency Resolution)

1. **메타데이터 초기화**: `ApplicationContext`가 구성 메타데이터(Java, XML, Annotation)를 기반으로 모든 빈의 정보를 생성합니다.
2. **의존성 주입**: 빈이 실제로 생성될 때(싱글톤은 구동 시점), 정의된 생성자 인수나 속성을 통해 의존성이 제공됩니다.
3. **타입 변환**: 문자열 형식을 `int`, `long`, `boolean` 등 적절한 타입으로 자동 변환하여 주입합니다.
4. **검증**: 컨테이너 로드 시 각 빈의 구성을 검증하여, 순환 참조나 누락된 빈 등의 문제를 조기에 발견합니다.

순환 의존성이 없는 경우, Spring IoC 컨테이너는 협력 bean이 종속 bean으로 주입되기 전에 각 협력 bean을 완전히 구성합니다. 즉, 종속성이 있는 bean A가 bean B에 의존하는 경우, Spring은 bean B를 먼저 완전히 구성하고, 그 다음에 bean A의 세터 메서드 또는 다른 의존성 주입 메커니즘을 통해 bean A를 구성합니다. 이 과정에서 bean은 인스턴스화되고 의존성이 설정되며, 관련된 라이프사이클 메서드(예: 구성 초기화 메서드 또는 InitializingBean 콜백 메서드)가 호출됩니다.

<!-- ORIGINAL_START
- 컨테이너는 다음과 같은 방식으로 Bean의존성을 해결합니다.
> 1. `ApplicationContext` 는 모든 bean을 설명하는 구성 메타데이터로 생성되고 초기화됩니다. 구성 메타데이터는 XML, Java 코드 또는 주석을 통해 지정할 수 있습니다.
> 2. 각 bean에 대해 해당 bean의 의존성이 속성, 생성자 인수 또는 정상적인 생성자 대신 사용할 경우 정적 팩토리 메서드의 인수 형식으로 표현됩니다. 이러한 의존성은 bean이 실제로 생성될 때 제공됩니다.
> 3. 각 속성 또는 생성자 인수는 설정할 값의 실제 정의 또는 컨테이너 내의 다른 bean에 대한 참조입니다.
> 4. 값으로 표시되는 각 속성 또는 생성자 인수는 지정된 형식에서 해당 속성 또는 생성자 인수의 실제 유형으로 변환됩니다. 기본적으로 Spring은 문자열 형식으로 제공된 값을 int, long, String, boolean 등의 모든 내장된 유형으로 변환할 수 있습니다.

스프링 컨테이너는 컨테이너가 생성될 때 각 bean의 구성을 검증합니다.  
그러나 bean 속성은 실제로 bean이 생성될 때까지 설정되지 않습니다.  
싱글톤 범위(singleton-scoped) 및 미리 인스턴스화(pre-instantiated)로 설정된 bean은 컨테이너가 생성될 때 만들어집니다(기본값).  
범위(scope)는 bean 스코프에서 정의됩니다. 그렇지 않으면 bean은 요청될 때만 생성됩니다.  
bean의 생성은 bean의 의존성 및 의존성의 의존성(및 그 이후)이 생성되고 할당되면서 일련의 bean 그래프를 만들 수 있습니다. 이러한 의존성 중 해결 불일치가 발생할 수 있으며, 이는 해당 bean이 처음으로 생성될 때 나타날 수 있습니다.

Spring은 일반적으로 안정적으로 동작하며 컨테이너를 로드할 때 구성 문제를 감지하고 해결합니다. Spring은 bean을 생성하고 의존성을 설정하는 작업을 가능한 늦게 수행하여 런타임에 문제가 발생할 가능성을 최소화합니다. 이것은 bean이 실제로 필요한 시점에 생성되므로 미리 초기화되지 않으며, 이로써 구성 문제를 미리 파악하고 예외를 던질 수 있습니다. `ApplicationContext` 구현은 기본적으로 싱글톤 bean을 미리 초기화하도록 설계되어 있어 초기 시간과 메모리 비용이 약간 들지만, 구성 문제를 미리 감지하고 이후에 발생하지 않도록 합니다. 그러나 싱글톤 bean의 게으른 초기화를 설정하여 이 동작을 변경할 수도 있습니다.
ORIGINAL_END -->

---
### 빈 등록 방법 (BeanDefinition)
Bean을 등록하기 위해서는 XML 설정, `@Component` 계열 어노테이션을 이용한 컴포넌트 스캐닝, 또는 Java 기반의 `@Configuration` 설정을 사용합니다. 이 모든 구성 정보는 내부적으로 `BeanDefinition` 인스턴스로 변환되어 Spring IoC 컨테이너가 빈을 생성하고 로드하는 데 활용됩니다.

---

<a name="26일"></a>
## 26일

### Bean 초기화 및 지연 로딩 (depends-on, Lazy-init)

Spring 컨테이너가 빈을 생성하고 관리하는 세밀한 제어 방법인 `depends-on`과 `Lazy-initialized Beans`에 대해 정리합니다.

기본적으로 `ApplicationContext`는 모든 싱글톤 빈을 컨테이너 구동 시점에 미리 생성(Pre-instantiation)하여 구성 오류를 즉시 발견하도록 설계되어 있습니다.

#### 1. depends-on (명시적 의존성 제어)
일반적으로 빈 사이의 의존성은 `<ref/>` 등을 통해 자동으로 관리되지만, 직접적인 참조가 없더라도 특정 빈이 먼저 초기화되어야 하는 경우가 있습니다. (예: 데이터베이스 드라이버 등록 후 커넥션 풀 생성)

- **초기화 순서**: `depends-on`으로 지정된 빈들이 먼저 초기화된 후 해당 빈이 생성됩니다.
- **소멸 순서 (Destruction)**: 싱글톤 빈의 경우, `depends-on`은 **소멸 순서도 제어**합니다. 종속된 빈이 먼저 소멸되고, 그 후에 `depends-on`으로 지정했던 빈이 소멸되어 안전한 리소스 해제를 보장합니다.

#### 2. Lazy-initialized Beans (지연 초기화)
모든 싱글톤 빈을 컨테이너 구동 시점에 미리 생성(Pre-instantiation)하지 않고 리소스 효율을 위해 실제 사용 시점까지 생성을 미루고 싶을 때 지연 초기화를 사용합니다.

- **동작**: 빈이 처음으로 요청될 때 IoC 컨테이너가 인스턴스를 생성합니다.
- **예외 상황**: 지연 초기화 빈이 **지연 초기화되지 않은 일반 싱글톤 빈의 종속성**으로 주입되는 경우, 싱글톤 빈의 초기화를 완료하기 위해 컨테이너 시작 시점에 강제로 생성됩니다.

<!-- ORIGINAL_START
### Spring의 depends-on, Lazy-initialized Beans
spring 공식 문서 번역중 depends-on과 Lazy-initialized Beans에 대해 번역하였다.  
먼저 depends-on에 대해 간단히 설명하자면

#### depends-on
depends-on이 사용되는 빈은 초기화 되기전에 하나 이상의 빈이 명식적으로 초기화 되도록 강제합니다.  
추가로 몰랏던것은 depends-on을 이용하면 종료 순서도 제어 할 수 있다는것에 놀랏다.  
초기화때 종속성과 싱글톤 빈의 경우에는 dependency during destruction을 지정 할수 있다한다.

#### Lazy-initialized Beans
기본적으로 `ApplicationContext` 는 모든 싱글톤 빈을 미리 생성하고 구성합니다.  
이러한 미리 인스턴스화는 구성 및 환경의 오류를 즉시 발견하기 때문에 바람직합니다.  
하지만 이렇게 미리 만드는것을 원하지 않는다면 Lazy-initialized Beans 을 적용하면 됩니다.  
빈 정의를 지연초기화로 표시하여 미리 인스턴스 하지않습니다.  
지연 초기화 된 빈인 경우 Ioc 컨테이너는 처음 요청될 때 생성합니다.

한가지 주의 할 점은 지연 초기화 빈이 지연 초기화가 아닌 싱글톤 빈의 종속성일때 `ApplicationContext` 는 시작시에 지연 초기화된 빈을 생성합니다.  
이는 싱글톤 종속성을 충족하기 위함입니다. 지연 초기화된 빈이 다른 지연 초기화 되지않는 싱글톤 빈에 주입됩니다.  
(생각해보면 당연한게 다른 지연 초기화 싱글톤 빈이 지연초기화빈을 최초 요청한 것이나 다름없기 때문인것 같다.)
ORIGINAL_END -->

---

<a name="30일"></a>
## 30일

### Lookup Method Injection (메서드 주입)

대부분의 Spring 빈은 싱글톤으로 관리되지만, 특정 시나리오에서는 요청마다 새로운 인스턴스가 필요한 프로토타입 빈을 사용해야 합니다. 이때 **싱글톤 빈(A)이 프로토타입 빈(B)에 의존할 때 발생하는 문제**를 해결하기 위해 Lookup Method Injection을 사용합니다.

#### 문제 상황
싱글톤 빈 A는 컨테이너 구동 시 딱 한 번 생성되므로, 내부에 주입된 프로토타입 빈 B 역시 한 번만 주입되고 고정됩니다. 이후 빈 A를 통해 빈 B를 호출해도 매번 새로운 객체가 반환되지 않는 문제가 발생합니다.

#### 해결책: @Lookup
Spring 컨테이너가 해당 메서드를 오버라이드하여, 메서드 호출 시마다 컨테이너에서 대상 빈을 다시 조회(get)하여 반환하도록 동적으로 서브클래스를 생성합니다.

#### 제약 사항 및 주의 사항
- **CGLIB 활용**: Spring은 런타임에 바이트코드를 조작하여 서브클래스를 생성하므로, 클래스와 메서드에 `final` 키워드를 사용할 수 없습니다.
- **추상 메서드**: 메서드를 `abstract`로 선언할 수 있으며, 이 경우 테스트 시 스텁(Stub) 구현이 필요합니다.
- **Factory Method 제약**: `@Bean` 메서드를 통해 생성된 빈의 경우 컨테이너가 직접 인스턴스화를 제어하지 않으므로 Lookup 기능이 작동하지 않을 수 있습니다.

> [!TIP]
> Lookup Method Injection은 프레임워크에 대한 의존성을 코드에 남기지 않으면서도 스코프가 다른 빈 간의 의존성 문제를 깔끔하게 해결할 수 있는 강력한 기능입니다.

<!-- ORIGINAL_START
### spring Lookup
spring의 몰랏던 기능을 하나 알게되엇다.  
공식문서를 꼼꼼히 읽어본 보람이 있다.

spring의 LookUp 기능인데 다음과 같은 경우를 해결할 때 사용하면 좋다.  
거의 대부분의 애플리케이션에서 bean 전략을 싱글톤으로 사용할 것 입니다.  
하지만 경우에 따라 bean을 싱글톤으로 등록하지 않고 요청이 필요할 때 마다 생성해야한다면 문제가됩니다.  
이런 문제를 해결할려고 프로토타입 형식의 bean 방식도 있지만 이 방식은 다음과 같은 경우 일때 문제가 됩니다.  
싱글톤 빈 A와 비싱글톤(프로토타입) 빈 B가 있다 가정하여보겠습니다.  
빈A가 빈B를 속성으로 정의한다 가정 하였을 때 빈A는 싱글톤으로 단 한번 생성되기 때문에 빈B를 생성하는것도 단 한번입니다.  
빈A가 구성될때 딱 한번만 빈B가 필요하기 때문이죠.  
만약 어떠한 요청이 올때마다 새로운 빈을 생성해야 한다면 위 방법으로는 해결 할 수 없습니다.  
이럴때 Lookup Method Injection을 사용 하면 좋습니다.  
Lookup Method Injection는 컨테이너가 컨테이너 관리 빈의 메서드를 재정의 하여 컨테이너네의 다른 이름을 가진 빈의 조회 결과를 반환하는 기능입니다.  
프로토타입 빈만 가능합니다.  
주의 사항은 아래와 같습니다.

> [!NOTE]
> * 이 동적 서브클래스 생성이 작동하려면 Spring 빈 컨테이너에서 서브클래스화할 클래스는 `final`일 수 없으며, 오버라이드될 메서드 역시 `final`일 수 없습니다.
...
Lookup Method Injection의 사용법은 간단히 설명하면 다음과 같습니다.  
프로토타입빈을 가지는 싱글톤 빈A가 있습니다.  
빈A에서 프로토타입빈을 가져오는 메서드를 등록시키면 스프링이 해당 메서드를 제정의하여 매번 프로토타입빈을 재생성하여 가져올수 있게 해줍니다.

자세한 문법은 https://www.baeldung.com/spring-lookup 을 확인하면 좋습니다.

해당 기능의 장단점이 있다면 스프링의 ioc도 잘지키면서 위 요구사항을 잘 지킬수있지만 테스트하기 좀 힘들어지는 단점이 있습니다.  
(그래도 위와같은 요구사항이 나오면 사용하는것이 좋아보입니다)
ORIGINAL_END -->
