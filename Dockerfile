FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

# docker build -t nestapi .
# docker run  -it --rm -p 3000:3000 nestapi
# docker ps
# docker stop <container ID>