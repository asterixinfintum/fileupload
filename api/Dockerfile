FROM node:18
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 8001

EXPOSE $PORT

CMD [ "node", "index.js" ]