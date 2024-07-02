FROM node AS build

WORKDIR /usr/src/app

ADD src/ ./src/
COPY package.json .
COPY package-lock.json .
COPY webpack.config.js .
COPY index.html .

RUN npm install
RUN npm run build-prod

FROM nginx
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# copy custom static content to corresponding nginx directory
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html

# copy custom config to corresponding nginx directory
# default port 80, can be changed in nginx.conf
COPY mock.nginx.conf /etc/nginx/nginx.conf
