# Define base for all envs
FROM node:18-alpine as base
RUN npm install -g pnpm

# Dependencies install stage
FROM base as build
WORKDIR /usr/src/app
COPY ./packages/dashboard  .
RUN pnpm install
RUN pnpm run build

FROM caddy:2-alpine as prod
COPY ./packages/dashboard/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /usr/src/app/dist dist
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
EXPOSE 8080