# default node enviroment
FROM node

# # specify node enviroment matching package.json
# ENV NODE_VERSION 17.3.0

# root directory
WORKDIR /shopify/server
COPY package.json yarn.lock ./

# install all dependencies
RUN yarn install
COPY . .

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

EXPOSE 5000

# command to start
CMD ["node", "app.js"]