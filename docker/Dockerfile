FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine

COPY --from=build /app/dist/trail-races-frontend/browser /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# daemon off Keep Nginx running in the foreground so Docker can monitor it as the container's main process.
# Without this setting, the startup process could finish after launching Nginx in the background, potentially causing the container to stop.
CMD ["nginx", "-g", "daemon off;"]