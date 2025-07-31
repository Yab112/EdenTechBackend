# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml/yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port (default 5000)
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
