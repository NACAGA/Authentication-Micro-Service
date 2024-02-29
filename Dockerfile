
# Use a base image
FROM node:20-alpine

# set node environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# set working directory
WORKDIR /workspace

# Copy package.json and package-lock.json
COPY index.js .
COPY package*.json .
COPY src src
COPY test test

# Install dependencies
RUN npm ci
RUN npm install

# Start the application 
CMD ["npm", "run", "start"]
