FROM node:16-alpine

WORKDIR /Back

COPY . .

RUN npm install
RUN npm cache clean --force

EXPOSE 8091

CMD node index.js