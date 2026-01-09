# syntax=docker/dockerfile:1

FROM node:18-alpine as build
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

CMD ["npm", "run generate"]


FROM nginx:alpine as site
WORKDIR /app

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/public /app/static

EXPOSE 8080