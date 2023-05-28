FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/build .
RUN npm install -g http-server
EXPOSE 4000
CMD ["http-server", "-p", "4000"]