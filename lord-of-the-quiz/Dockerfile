FROM node:14 AS build
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using a lightweight server
FROM nginx:alpine
COPY --from=build /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]