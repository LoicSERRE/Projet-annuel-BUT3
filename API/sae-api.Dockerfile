FROM node:18.17.1
WORKDIR /api
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
