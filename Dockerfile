

FROM node:14


WORKDIR /usr/src/app


COPY package*.json ./



RUN npm install --only=production


COPY . .


EXPOSE 3000

#  using a "non-root" user.
USER node
CMD [ "node", "server.js" ]
