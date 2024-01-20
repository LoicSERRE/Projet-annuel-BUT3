FROM node:18.17.1
WORKDIR /webapp
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ]
