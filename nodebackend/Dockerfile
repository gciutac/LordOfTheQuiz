# Docker file to build the backend Node.js image using node 16 and run the backend server
FROM node:16
WORKDIR /
# Build the backend Node.js application
COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "index.js"]
