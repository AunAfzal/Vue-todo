# Stage 1: Build the Vue.js application
# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and the npm lockfile to leverage Docker cache
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with Nginx
# Use a lightweight Nginx image
FROM nginx:alpine

# Copy the built static files from the build stage to the Nginx server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
