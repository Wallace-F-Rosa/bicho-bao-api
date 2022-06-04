FROM node:14
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn global add @nestjs/cli
RUN yarn build
CMD ["yarn", "start:prod"]
