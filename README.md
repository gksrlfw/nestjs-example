# Simple nestjs example

Nestjs 기반의 간단한 예제 코드입니다.

계속해서 추가할 예정입니다.

개선, 버그는 Issue 에 남겨주세요!

# RUN

### ENV

| Name        | Description                   |
| ----------- | ----------------------------- |
| ENV_POSTFIX | .env.\* 에 필요한 변수입니다. |
| APP_ENV     | APP 환경변수                  |

자세한 내용은 [여기](./src/core/config/README.md) 확인하세요

### RUN ON LOCAL

1. 의존성을 설치합니다.

```
npm install
```

2. .env.\* 을 설정합니다.

3. 프로젝트를 실행합니다.

```
npm run start:dev
```

### RUN ON DOCKER

```
docker-compose up --build
```

# TODO

- [x] [configuration](./src/core/config/README.md)
- [x] graphql
  - [x] custom scalar
  - [x] [dataloader](./src/common/dataloader/README.md)
- [x] mysql
- [ ] mongodb
- [x] [husky, lint-staged](./.husky/README.md)
- [x] docker
- [ ] [k8s](./k8s/README.md)
