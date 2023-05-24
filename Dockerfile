FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE ${NODEJS_PORT}
EXPOSE ${NODEJS_DEV_PORT}

CMD [ "node", "app.js" ]