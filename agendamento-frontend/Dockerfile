
# Name the node stage "builder"
FROM node:16-alpine AS builder
# Set working directory
WORKDIR /app

FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

RUN apk update && apk add tzdata
ENV TZ="America/Manaus"

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]