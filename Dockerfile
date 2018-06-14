# docs: https://docs.docker.com/engine/reference/builder/

# BUILDER
FROM node:8.11.2-alpine as builder
MAINTAINER Marcel Eichner

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /ng-app
WORKDIR /ng-app

# node js deps
COPY package*.json ./
# speed up npm by disabling progress and deep listings
RUN npm config set progress false
RUN npm config set depth 0
# install node_modules
RUN echo "NODE_ENV is '${NODE_ENV}'"
RUN NODE_ENV=development npm install

# copy files needed to dist build
COPY src src
COPY angular.json angular.json
COPY tsconfig.json tsconfig.json
# dist build
RUN npm run dist

# MAIN
FROM nginx:alpine
COPY --from=builder /ng-app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
