
# Use the official Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copying package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# If you're using Yarn, you might want to copy yarn.lock and use yarn install below

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Inform Docker that the container listens on the specified port at runtime.
EXPOSE 3000

# Run the web service on container startup using a "non-root" user.
USER node
CMD [ "node", "server.js" ]
