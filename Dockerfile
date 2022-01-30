FROM node:12

# создание директории приложения
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]

# docker build . -t amvoronkov/node-web-app
