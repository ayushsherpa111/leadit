FROM node:14.11.0

WORKDIR /usr/share/app

COPY package.json .
COPY package-lock.json .

RUN ls

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5000
