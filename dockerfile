# for down-sized docker image
FROM node:14.15.3

ARG APP_ENV="dev"

ENV APP_ENV=$APP_ENV

ENV NODE_ENV=development

WORKDIR /app

COPY ./package.json ./

RUN npm install

# build 할 떄 필요한 것들도 복사
COPY ./tsconfig.json ./tsconfig.build.json ./nest-cli.json ./
COPY ./src ./src

# 의존성 설치 및 프로젝트 빌드
RUN npm run build

# port 노출
EXPOSE 3000

# application 실행
CMD npm run start:prod
