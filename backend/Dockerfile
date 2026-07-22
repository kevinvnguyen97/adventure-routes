FROM node:24-alpine AS development
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript ts-node

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]