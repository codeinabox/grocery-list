FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV PORT=8080 NODE_ENV=production

EXPOSE 8080
CMD [ "npm", "start" ]
