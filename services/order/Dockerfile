# Збірка
FROM node:18.8.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Запуск
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/build .
RUN npm install -g http-server
EXPOSE 4000

CMD ["http-server", "-p", "4000"]