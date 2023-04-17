FROM node:16

COPY ./package.json /GOW/
COPY ./yarn.lock /GOW/
WORKDIR /GOW/
RUN yarn install
COPY . /GOW/

CMD yarn start:dev