# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Steps to follow to run the project

1. Open the folder crypto-price-updates.
2. Open two terminal simultaneously.
3. In one of the terminal run the commands : 1. npm install  2. npm run server.
4. In the other terminal change the directory : cd ./client and the run the commands : 1. npm install  2. npm run start

### More details

1. Backend server is made using Node, Express, Socket.io etc.
2. I've used coingecko api for fetching live cryptocurrency prices.
3. The prices updates everytime there's an update from api.
4. The api rate limit is limited so price updates only twice for 5 minutes.
5. Frontend is done using create-react-app , react version is 18.2.0
6. I'm using OAuth for authentication.
7. In order to see the prices of cryptocurrency authentication is must

