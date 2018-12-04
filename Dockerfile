FROM node:11.3.0-alpine as build-env
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /app
ADD . /app
RUN cd /app && npm install && npm run build --production

FROM nginx:1.15.7-alpine
COPY --from=build-env ./app/build/ /var/www
COPY --from=build-env ./app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]