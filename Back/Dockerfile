FROM node:16-alpine
FROM nginx:alpine

WORKDIR /Back

COPY . .
COPY . /usr/share/nginx/html


EXPOSE 8091
EXPOSE 80

CMD node index.js