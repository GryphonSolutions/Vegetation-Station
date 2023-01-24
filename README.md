# Vegetation Station

_The Official Repository for the Vegetation Station Mobile App_\
<img src="client/public/favicon.png" width="200" height="200">

## Introduction

This project was a one-week challenge to design and execute a full-stack web application with a team of engineers while utilizing agile workflow based on a client's specific request.

- Our client wanted an application that allowed users to trade plants for other plants. They wanted strong user authentication to safely access the wanted features like accurate locations being displayed on a map, take and import pictures of the plants they were trading, live messaging between users, and more.

- As a team of 7 engineers, we built a fully functioning application that met the above requirements in 7 days.

## Description

### The problem and the client

- Vegetation Station is a mobile plant trading app. It allows plant lovers to post their unwanted plants online and to make trades for other users' plants.

- Our primary market for this application was college students, millennials, gardeners, and all plant lovers.

### User Inputs and Outputs - Users have the ability to interact with each other to complete plant-for-plant trades.

- Users can post plants to the app and receive incoming trade offers
- Users can make offers for plants that have already been posted to the app
- Users can message other users to ask questions, negotiate, and arrange trades
- Users can see the general geographical area that other users post their trades from

## Challenges

- The overall technical challenges we faced was designing and executing such a large-scale application in such a short time while also making it look professional. Our team solved this by implementing redux to manage all of the states that would be utilized throughout the application, react-router to handle the navigation between pages, and firebase to handle authentication for the app.

## Video Demo

<details><summary>Login</summary>
</details>

<details><summary>Home Page</summary>
</details>

<details><summary>Plant Details</summary>
</details>

<details><summary>Post A Plant</summary>
</details>

<details><summary>Messaging</summary>
</details>

<details><summary>Profiles</summary>
</details>

<details><summary>Trade Proposals</summary>
</details>

## User story and MVP

- Provide users with the ability to trade their plants for other plants.
- Allows users to communicate with each other to work out the details of their trades.
- Identify trades that are within a general location around the user.
- Users can post plants to the trading board which allows them to seek out someone who wants it and to show off their plants.
- Serve as a medium in which revenue-generating advertising can be strategically placed.

## How does the app work?

- Behind the scenes
  - Authentication is handled through Firebase, with user data being stored on a local server. Email and Google account based authentication were implemented. We separated authentication and account management logic as a way to mitigate the risk of data breaches on the server.
  - Upon initial rendering of the page, the users information is pulled from the database utilizing axios, express, and firebase queries
  - The users data is utilized to conditional render their homepage, profile, trade proposal, and messages
  - Redux state is leveraged to render initial settings and update the display as the user makes changes, with data being updated in the backend simultaneously.
  - Common data shared by components is held in Redux. Data unique to a rendered page is held in state, then sent to the database via axios when appropriate.
  - On the backend, the data is organized and stored on the database server using Firebase as the database management system
- How does the tech stack come together?
  - Components of our tech stack communicate seemlessly: Redux directing rendering and axios request to the backend, the backend recieving those request with express.js and processing them with node.js to store them in a firebase database.

### Front End Notes

- `eslint` has been configured with the AirBnB style guide

### Getting started: Developer Tools

- Download the Expo Go App
  - In your terminal, execute npx expo whoami
  - Then execute npx expo login
  - Login
  - Then execute npx expo whoami to confirm you're logged in
  - Log into the Expo Go App
  - Run the npm start script in the repository

## Contributors

Thomas Saldana (Project Manager)\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/amberly-n-malone/)](https://www.linkedin.com/in/thomassaldana/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/amberlyM)](https://github.com/SaldanaThomas)

Mo Akbari (Architecture Owner)\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/lbrian-phaml/)](https://www.linkedin.com/in/mo-akbari-54371424b/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/brianpham97)](https://github.com/akbarimo)

Wonseok Park (UI Owner)\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/lbrian-phaml/)](https://www.linkedin.com/in/wonseok-park/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/brianpham97)](https://github.com/officiallywily)

Kyle Martinelli\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/james-stolhammer/)](https://www.linkedin.com/in/kylemartinelli/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/stolinator)](https://github.com/kylemartinelli)

Brain Anusiem\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/jessiezhao8/)](https://www.linkedin.com/in/briananusiem/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/jzthacoder)](https://github.com/JustDatGuy)

Ryan Gehris\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/mattwaelder/)](https://www.linkedin.com/in/ryangehris/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/mattwaelder)](https://github.com/RyanGehris)

Matt Sigler\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/kevinpho/)](https://www.linkedin.com/in/matthew-sigler/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/phok1012)](https://github.com/siglerm)

## Technology Used

**Front-end:** &emsp;&nbsp;&nbsp;
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5a29e4.svg?style=for-the-badge&logo=axios&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Airbnb](https://img.shields.io/badge/Airbnb-%23ff5a5f.svg?style=for-the-badge&logo=Airbnb&logoColor=white)

**Back-end:** &emsp;&nbsp; &nbsp;
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Thanks for Reading!

If you've made it all the way down here, we thank you for reading and we hope you enjoy our application.

## MAX's thoughts™

- I thought it was really interesting being able to trade plants. I think that was a really good idea. Maybe trade illegal plants? Could there be a Vegetation Station after Dark?
