FROM node:18.17.1
WORKDIR /usr/src/sae-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
