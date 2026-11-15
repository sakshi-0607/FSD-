# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package dependency manifests
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy application source code
COPY . .

# Build argument for backend Socket.IO / API URL
ARG VITE_SOCKET_URL=http://localhost:5000
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

# Build the React production bundle
RUN npm run build

# Production Stage with Nginx
FROM nginx:alpine

# Copy built frontend assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for React SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

