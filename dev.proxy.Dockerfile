# default port 80, can be changed in nginx.conf
FROM nginx
COPY dev.nginx.conf /etc/nginx/nginx.conf
