FROM node:10-alpine
WORKDIR /app
COPY . .
RUN npm install -g serve
RUN npm install && npm run build
CMD ["serve", "-p", "80", "-s", "./build"]