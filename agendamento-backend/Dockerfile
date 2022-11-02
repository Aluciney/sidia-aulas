FROM node:18.12

RUN apt-get update && apt-get install curl
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt update && apt install --no-install-recommends yarn
		
WORKDIR /home/node/app
COPY . /home/node/app

ARG MY_IP
ARG DB_PASS

ENV DB_HOST_DEV "${MY_IP}"
ENV DB_HOST_TEST "${MY_IP}"
ENV DB_PASS_DEV "${DB_PASS}"
ENV DB_PASS_TEST "${DB_PASS}"

RUN yarn install
# RUN yarn test && yarn init-application

EXPOSE 3050

CMD [ "yarn", "dev" ]