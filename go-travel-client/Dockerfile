# ---------------- Build Stage ----------------
    FROM node:20 AS builder
    WORKDIR /app
    
    # Install deps
    COPY package.json package-lock.json ./
    RUN npm install
    
    # Copy source
    COPY . .
    
    # Build Vite
    ARG VITE_SERVER_API_URL
    ENV VITE_SERVER_API_URL=$VITE_SERVER_API_URL
    RUN npm run build
    
    
    # ---------------- Runtime Stage ----------------
    FROM nginx:stable-alpine
    
    # Remove default nginx config
    RUN rm /etc/nginx/conf.d/default.conf
    
    # Copy built files
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Copy our custom nginx config
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    