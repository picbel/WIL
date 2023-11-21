11월 2주차
===

[16일]
- 최근 스프링 공식문서를 번역해보면서 공부중인데 사소한 디테일까지 알게되는것 같아 생각보다 재미있다. \
  오늘 요약할것은 `Spring IoC 컨테이너 및 빈 소개` 글인데 내용을 간단히 요약하면 다음과 같다.
> DI는 객체가 스스로 종속성을 관리하는 대신 생성자 인수, 팩토리 메서드 인수 등 속성 설정을 통해 종속성을 정의하고, 컨테이너가 빈을 생성할 때 이러한 종속성을 주입하는 프로세스입니다. 이것은 bean이 종속성을 직접 생성하거나 Service Locator 패턴과 같은 메커니즘을 사용하여 관리하는것과 정반대의 원칙입니다.

```
용어 정리
IOC (Inversion of Control):
IOC는 제어의 역전을 의미하며, 소프트웨어 컴포넌트 간의 제어 흐름의 역전을 말합니다. 일반적으로 프로그램이 제어의 주체가 되는 것이 아니라 외부 컨테이너나 프레임워크에 의해 제어의 주체가 바뀌는 것을 의미합니다. 

DI (Dependency Injection):
DI는 의존성 주입을 나타내며, 한 객체가 다른 객체에 필요한 의존성을 주입받는 것을 의미합니다. 즉, 객체가 직접 필요한 다른 객체를 생성하지 않고 외부에서 의존성을 주입받는 것입니다. 이를 통해 객체 간의 결합도를 낮출 수 있고, 테스트하기 쉬운 코드를 작성할 수 있습니다.
```
- ApplicationContext는 BeanFactory의 하위 인터페이스이다. 다음 기능이 추가되었다 보면됩니다
  - Easier integration with Spring’s AOP features(스프링 Aop와 더 쉬운 통합)
  - Message resource handling (for use in internationalization)(메시지 리소스 처리)
  - Event publication (이벤트 개시)
  - Application-layer specific contexts such as the WebApplicationContext for use in web applications. (웹 응용 프로그램에서 사용하는 `WebApplicationContext`와 같은 응용 프로그램 레이어별 특정 컨텍스트.)

11월 3주차
===
번역한거 정리

