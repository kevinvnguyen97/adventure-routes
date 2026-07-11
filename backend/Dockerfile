FROM node:24-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript ts-node

COPY . .
RUN npm run start

EXPOSE 8081

CMD ["ts-node", "server.ts"]