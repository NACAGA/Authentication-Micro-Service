
# Use a base image
FROM node:20-alpine

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN npm install

# Copy the source code
COPY . .

# Start the application
CMD ["npm", "run", "start"]
