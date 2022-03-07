FROM node:16-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json /opt/app
COPY yarn.lock /opt/app
RUN yarn install

COPY . /opt/app

ENV NODE_ENV production
ENV PORT 3000

RUN yarn build

EXPOSE 3000

CMD yarn start
