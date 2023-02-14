FROM node:16-alpine

COPY package*.json ./

WORKDIR /usr/api

COPY . .

RUN npm install
RUN npm cache clean --force

EXPOSE 9000

CMD node index.js