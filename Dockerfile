FROM node:8.9.1-alpine as builder
WORKDIR /build
ADD "package.json" /build
RUN yarn install
COPY . /build
RUN npm run build

FROM nginx:latest
ENV LETSENCRYPT_HOST v2.premiersted.schibsted.ga
ENV VIRTUAL_HOST v2.premiersted.schibsted.ga
ENV LETSENCRYPT_EMAIL mateusz@odel.ga
COPY --from=builder /build/dist/ /usr/share/nginx/html 