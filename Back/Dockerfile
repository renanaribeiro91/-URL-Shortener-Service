FROM node:16-alpine

FROM nginx

COPY . .

ADD site.tar /usr/share/nginx/html/

RUN npm install
RUN npm cache clean --force

EXPOSE 80

CMD node index.js