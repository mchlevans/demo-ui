# default port 80 else set in nginx.conf
FROM nginx
COPY dev.nginx.conf /etc/nginx/nginx.conf
