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
# FROM node:alpine3.18 AS build

# WORKDIR /app

# # Copy .env first so it can be used by Vite
# COPY .env ./

# # ✅ Debug print .env
# RUN echo "Environment Variables in .env:" && cat .env && \
#     echo "---" && grep VITE_API_BASE_URL .env

# # Install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy the remaining files
# COPY . ./
# RUN npm run build

# # Step 2: Production stage
# FROM nginx:1.23-alpine

# # Remove default nginx files (optional)
# RUN rm -rf /usr/share/nginx/html/*

# # Copy build files from previous stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start nginx server
# CMD ["nginx", "-g", "daemon off;"]

# deployment test

# -----------------------------
# Step 1: Build stage
# -----------------------------
FROM node:18-alpine AS build

WORKDIR /app

# Copy env first (useful if using VITE_ prefixed vars)
COPY .env ./

# Copy dependencies and install
COPY package.json package-lock.json ./
RUN npm install

# Copy app source
COPY . .

# Build the app (Vite will create /dist)
RUN npm run build

# -----------------------------
# Step 2: Serve via NGINX
# -----------------------------
FROM nginx:1.23-alpine

# Clean existing html folder
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom NGINX config for React routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
