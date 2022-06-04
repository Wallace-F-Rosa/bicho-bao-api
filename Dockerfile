FROM nestjs/cli:lts
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
CMD ["yarn", "build"]
CMD ["yarn", "start:prod"]

