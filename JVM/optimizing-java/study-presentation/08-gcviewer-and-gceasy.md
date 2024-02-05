# GCViewer 와 GCEasy 사용 방법 알아보기

⎯ 남궁민

## GCViewer

- 인디 소프트웨어 샵 tagtraum industries에서 출시한 오픈소스 GC 시각화 도구
  - 2008년 1.29 버전까지 출시하고 개발 중단
  - 이후 Jörg Wüthrich가 최신형 JVM과 호환되는 1.36 버전까지 출시 (2019)
- `-verbose:gc` `-Xloggc:<file>` 플래그를 사용하여 GC 로그를 생성하고, 파일을 열어서 시각화하는 방식
- 처리량, 누적 중단 시간, 최대 중단 시간 등 유용한 메트릭 제공
- GC 로그를 CSV 파일로 export 가능
- Oracle, IBM, HP, BEA의 JVM 지원

### 실행 방법

1. 실행 파일 다운로드 후 압축 풀고 더블 클릭
2. jar 파일 다운로드 후 `java -jar gcviewer-1.36.jar` 명령어 실행

### 차트 보는 방법

- Full GC
  - 검은색 수직선으로 표시
- Incremental GC
  - 청록색 수직선으로 표시
- GC Times
  - 녹색 선으로 표시
  - 모든 GC 소요 시간을 표시
- Total Heap
  - 빨간색 선으로 표시
- Tenured Generation
  - 마젠타색 선으로 표시
  - tenured 영역의 크기를 표시
  - `PrintGCDetails` 플래그를 사용해야만 함
- Young Generation
  - 오렌지색 선으로 표시
  - young 영역의 크기를 표시
  - `PrintGCDetails` 플래그를 사용해야만 함
- Used Heap
  - 파란색 선으로 표시
  - 힙 사용량을 표시
- Initial mark level
  - 노란색 선으로 표시
  - initial mark 단계에서의 힙 사용량 표시
  - 동시 수집을 사용하는 CMS, G1에서만 사용 가능
- Concurrent collections
  - 동시 마킹 시작 단계를 청록색으로 표시
  - 동시 수집 종료 단계를 분홍색으로 표시
    - CMS의 concurrent reset 단계
    - G1의 concurrent cleanup end 단계
- GC Times Rectangles
  - Full GC에 대한 검은색 직사각형
  - initial mark 단계에 대한 파란색 직사각형
  - remark 단계에 대한 오렌지색 직사각형
  - vm operation에 대한 빨간색 직사각형
  - 'normal' GC에 대한 회색 직사각형

## GCEasy

- Tier1app에서 출시한 온라인 GC 로그 분석 도구
- 머신러닝 기술을 활용한다고 함

### 가격 정책

- PUBLIC
  - 5회 업로드 가능
  - 최대 10MB의 로그 파일
- PRO
  - 30$ / 월
  - 10회 업로드 가능
  - 최대 100MB의 로그 파일
- PRO ++
  - 50$ / 월
  - 50회 업로드 가능
  - 최대 300MB의 로그 파일
- ENTERPRISE
  - 업로드 횟수 제한, 로그 파일 크기 제한 없음

### 사용 방법

1. 웹사이트에 GC 로그 업로드
2. REST API 호출

### 로그 분석 결과

- [미리 생성해둔 GCEasy Report](https://gceasy.io/my-gc-report.jsp?p=c2hhcmVkLzIwMjQvMDIvNC9nYy5sb2ctLTgtNTctNTc=&channel=WEB)
