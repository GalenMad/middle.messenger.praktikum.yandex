# TODO: Настроить хук на гитхабе 
# https://medium.com/geekculture/deploy-to-heroku-from-a-macbook-m1-heroku-cli-or-githubactions-868bc3a50935
FROM node:12

WORKDIR /usr/src/app

COPY . .
RUN npm install husky -g
RUN npm install
RUN npm run build

EXPOSE 4000
CMD [ "node", "server.js" ]
