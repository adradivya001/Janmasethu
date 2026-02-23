# Use Node.js 20 Alpine for a lightweight base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache for dependencies
COPY package*.json ./

# Install dependencies (ci for clean install)
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
# This runs "vite build" (frontend) and "esbuild server/index.ts" (backend)
RUN npm run build

# Expose the application port
EXPOSE 5100

# Start the application
CMD ["npm", "start"]
