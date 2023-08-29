# Define base for all envs
FROM node:18-alpine as base
RUN npm install -g pnpm

# Dependencies install stage
FROM base as build
WORKDIR /usr/src/app
COPY ./packages/dashboard  .
RUN pnpm install
RUN pnpm run build

FROM node:18-alpine as prod
ENV NODE_ENV production
COPY package.json .
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
RUN npm i -g serve
EXPOSE 3000
CMD ["serve","./dist"]
