FROM node:16-alpine

FROM nginx

WORKDIR /Back

COPY . .

ADD site.tar /usr/share/nginx/html/

EXPOSE 80

CMD node index.js