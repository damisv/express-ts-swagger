FROM node:16-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

# # RUN npm ci --only=production --ignore-scripts

COPY . /usr/src/app

RUN npm run build:all

ENV NODE_ENV docker

EXPOSE 3000
CMD [ "npm", "run", "server" ]