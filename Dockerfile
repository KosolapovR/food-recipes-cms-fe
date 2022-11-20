FROM --platform=linux/x86_64 node:16-alpine

WORKDIR /usr/cms
COPY package.json .

RUN rm -rf ./node_modules
RUN rm -rf ./package-lock.json

RUN apk update && apk --no-cache add bash coreutils

RUN npm install

COPY . /usr/cms

CMD npm run build

