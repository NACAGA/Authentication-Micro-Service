
# Use a base image
FROM node:20-alpine

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN npm install

# Copy the source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
