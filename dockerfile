# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app

COPY package.json package.json
COPY package.json package.json
RUN npm ci

COPY . .

CMD ["npm", "run start"]
EXPOSE 3000