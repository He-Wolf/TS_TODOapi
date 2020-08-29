FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
#COPY ["nestapp.db", "dist"]


FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

# docker build -t nestapi .
# docker run  -it --rm -p 3000:3000 nestapi
# docker ps
# docker stop <container ID>