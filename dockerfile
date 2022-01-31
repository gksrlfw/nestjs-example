FROM node:14.15.3

# WORKDIR 을 설정합니다.
WORKDIR /app

# 의존성을 설치합니다.
COPY package.json .
RUN npm install

# build 에 필요한 코드를 복사하고 빌드합니다.
COPY ./tsconfig.json ./tsconfig.build.json ./nest-cli.json ./
COPY ./src ./src
RUN npm run build

# 프로젝트를 시작합니다.
EXPOSE 3000
CMD npm run start:docker
