FROM node:16.13.2

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]