# 여행가자 프로젝트

> 여행 패키지 탐색부터 항공편 선택 및 예약까지의 전체 흐름을 구현한 풀스택 여행 예약 플랫폼

## 📌 Project

여행 패키지와 항공편을 조회하고 예약할 수 있는 여행 예약 서비스입니다.
사용자 중심의 단계별 예약 흐름을 구현하고, 월 단위 항공 스케줄 조회와 같은 대량 데이터 조회 구간의 성능 개선에 중점을 두었습니다.

**주요 개발 내용**

* 여행 패키지 및 항공 스케줄 조회
* 항공편 선택 및 예약 프로세스 구현
* JWT 기반 사용자 인증
* 대량 데이터 조회를 위한 MyBatis 쿼리 최적화
* TanStack Query를 활용한 서버 상태 캐싱
* Zustand를 활용한 전역 상태 관리
* Global Exception Handler를 통한 예외 처리
* Docker 및 AWS 기반 배포 환경 구성

## 🛠️ Tech Stack

**Backend**
`Java` `Spring Boot` `Spring Security` `JPA` `MyBatis` `JWT` `MySQL`

**Frontend**
`React` `TypeScript` `TanStack Query` `Zustand` `Axios`

**Infra**
`Docker` `AWS EC2` `AWS RDS`

## 🎯 Key Point

**JPA + MyBatis**를 조회 특성에 따라 분리하여 기본 CRUD와 복잡한 조회 로직을 효율적으로 처리하고,
**MyBatis 쿼리 최적화 + TanStack Query 캐싱**을 통해 대량 항공 스케줄 조회 성능을 개선했습니다.
