FROM node:18 as build
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY pnpm-lock.yaml .
RUN pnpm fetch
COPY .env .
COPY ./packages/server .
RUN pnpm install 
ENV DATABASE_URL={DATABASE_URL}
RUN pnpx prisma generate
RUN pnpm run build

FROM build as dev
CMD [ "node", "dist/main.js" ]
EXPOSE 4000

FROM node:18-alpine As prod
WORKDIR /usr/src/app
ENV NODE_ENV production
ENV PRODUCTION="true"
# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/.env .
# Start the server using the production build
CMD [ "node", "dist/main.js" ]
EXPOSE 4000