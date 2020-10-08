FROM node:14.11.0

WORKDIR /usr/share/app

COPY package.json .
COPY package-lock.json .

RUN ls

RUN npm i

COPY src ./src
COPY @types ./@types
COPY ormconfig.json .
COPY tsconfig.json .

EXPOSE 5000
