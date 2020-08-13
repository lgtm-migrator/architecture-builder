FROM node:14.8.0

WORKDIR /root
RUN mkdir -p /root/build

COPY tsconfig.json /root
COPY package.json /root
COPY package-lock.json /root

RUN npm i --quiet

COPY test /root/test
COPY src /root/src
