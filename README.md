# Grocery List
A simple SPA grocery list application

## Structure
The application is a mono repo consisting of two parts: in the folder `server` an API written in Node, and in `client` a React SPA, which for development is served up using [Create React App](https://github.com/facebook/create-react-app) and in production via Nginx.

It also has a MySQL database running inside its own container.

## Dependencies
To run the application locally you need [Docker and Docker Compose](https://docs.docker.com/compose/install/), whilst for development you will need NodeJS and NPM installed.

## Running locally in Docker
Run `docker-compose up -d` and when it's finished run `docker-compose ps` and look for the `grocery-list_web_1` to see which port it is running eg http://0.0.0.0:32787

## Developing locally
Local development is possible by spinning up the following parts:
 - A local database using `docker-compose up -d database`
 - The API server by running `npm start` inside of `server`
 - The React front end by running `npm start` inside of `client`

Before running `npm start` you will need to install the dependencies in both the client and server using `npm install`

For development the front end uses [Create React App proxy](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development) to send /api requests to the backend. For production this is handled by Nginx.

You will need to pass the database credentials to the API server via environment variables. Given more time I would have automated this process.

## Tests
Both the client and server have their own unit tests which can be run from the respective folders using `npm test`

