# Base image
FROM node:14-alpine as build

# Set the working directory
WORKDIR /front

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Use the Nginx image as a base
FROM nginx:1.19.6-alpine

# Copy the build artifacts to the Nginx root directory
COPY --from=build /front/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]