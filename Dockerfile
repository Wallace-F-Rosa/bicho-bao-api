# build app
FROM node:lts as builder
ENV NODE_ENV build
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build

# start in production mode

FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/dist ./dist/
CMD ["yarn", "start:prod"]
