# # Step 1: Build stage
# FROM node:alpine3.18 AS build

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # Step 2: Production stage
# FROM nginx:1.23-alpine

# # Remove default nginx files (optional)
# RUN rm -rf /usr/share/nginx/html/*

# # Copy build files from previous stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy custom nginx config (optional, if you want)
# # COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# Step 1: Build stage
FROM node:alpine3.18 AS build

WORKDIR /app

# Copy .env first so it can be used by Vite
COPY .env ./

# ✅ Debug print .env
RUN echo "Environment Variables in .env:" && cat .env && \
    echo "---" && grep VITE_API_BASE_URL .env

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the remaining files
COPY . ./
RUN npm run build

# Step 2: Production stage
FROM nginx:1.23-alpine

# Remove default nginx files (optional)
RUN rm -rf /usr/share/nginx/html/*

# Copy build files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

