FROM node:14-alpine
COPY . /app/server
WORKDIR /app/server
RUN npm install
CMD npm start
