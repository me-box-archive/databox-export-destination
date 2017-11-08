FROM node:alpine

COPY . .
RUN npm install

EXPOSE 8080 8282

CMD ["npm","start"]
