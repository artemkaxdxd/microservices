# Use an official Node.js runtime as a parent image
FROM node:14-alpine as build

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight http server image as a parent image
FROM node:14-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the static files from the build stage to the http server document root
COPY --from=build /app/build .

# Install http-server
RUN npm install -g http-server

# Expose port 8080 for the http server
EXPOSE 4000

# Start the http server
CMD ["http-server", "-p", "4000"]
