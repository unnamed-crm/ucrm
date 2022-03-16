FROM node:12-alpine as builder

WORKDIR /app

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./frontend/ .

RUN yarn build --mode development

FROM nginx:1.19.9

COPY ./docker/develop/nginx/frontend.nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
