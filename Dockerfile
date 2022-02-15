FROM node:16.14.0-alpine3.14

WORKDIR /

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run start
