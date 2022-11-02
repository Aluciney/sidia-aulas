FROM node:18.12

RUN apt-get update && apt-get install curl
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt update && apt install --no-install-recommends yarn
		
WORKDIR /home/node/app
COPY . /home/node/app

RUN yarn install

EXPOSE 8080

CMD [ "yarn", "start" ]