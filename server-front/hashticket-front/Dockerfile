# Stage 1
FROM node:18.15 as node
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/hashticket-front /usr/share/nginx/html
