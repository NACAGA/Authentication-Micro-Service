
# Use a base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN npm install

# Copy the source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
