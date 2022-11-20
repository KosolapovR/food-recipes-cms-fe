FROM --platform=linux/x86_64 node:16-alpine

WORKDIR /usr/cms
COPY package.json .

RUN rm -rf ./node_modules
RUN rm -rf ./package-lock.json

RUN apk update && apk add bash

RUN npm install

COPY . /usr/cms

CMD npm run build

