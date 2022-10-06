# EvenBike 

## About

EvenBike helps to make public biking system more eco-friendly. Many cities in the world now have implemented public bike systems. However, one of the problems with the bike-sharing system is that bikes need to be redistributed usually at the end of the day to ensure enough bikes in popular locations. With mobile-first design in mind, EvenBike, a web application, enables public bike riders to help rebalance the number of bikes in each bike dock, reducing the need to redistribute bikes with trucks. 

## Features

### Core Feature
* The core feature of EvenBike is to prompt users with a list of bike docks near their departing and destination locations. The list at the starting point is sorted in descending order based on how occupied the docks are, while the list at the ending point is sorted the opposite way. The goal is to encourage users to start from a fuller dock and bike toward a more vacant dock. As such, the users can easily and consciously help to balance the number of bikes in the overall public biking system. 
* EvenBike allows users to plan and record their biking trips. Logged-in user can type their location, which gets autocompleted by Google Place API and, based on their location, receives a list of recommended bike docks. Users can start, and end their trips, view the trip summary and review their trip history on their profile page. 

### Other Features

* EvenBike has user login, logout, and register functions. Logged-in users can check and update their profile, which contains their biking history and the eco_points and active_points they earned. 


## URL
The backend of EvenBike has been deployed on Heroku. 👉 https://evenbike.herokuapp.com 

You can check out the frontend has been published on Surge. 👉 http://evenbike.surge.sh/home

## Test
EvenBike contains unit test and intergration test on the backend.I am using jest for unit test and supertest for testing API endpoints. On the React frontend, smoke test, snapshot test and specialized test have been used to make sure that the user interface is what is expected. Backend tests are in the folder: `__tests__`. Frontend tests are stored in the form of `*.test.js` in same folder as component. 

### Backend Testing
For backend testing, cd into the repository folder backend, type `npm run pretest` and enter. This will change the node environment to testing environment and start a local server at http://localhost:3001 . Make sure you have set up a test database. Then type `npx jest` or `jest`. 

### Frondend Testing
For frontend testing, cd into the repository folder frontend, type `npm test`.

## Userflow
![Userflow created on Figma](https://github.com/nonagonyang/evenbike_backend/blob/main/userflow.png "EvenBike Userflow")


## API

### Evenbike server-side API
EvenBike is a full-stack web application. The backend is a RESTful API with Node.js. I used Express as the application framework to help manage servers and routes. I used Middleware, which takes an incoming request and checks the authorization information(JWT) to search for a user in the database. JSON schema is used to ensure the quality of client-submitted data.

It has A client-server architecture made up of clients, servers, and resources, with requests managed through HTTP. The resources here come from my psql_database and an external API.

The backedn API is structured with three major routes: auth, profile, and trip. Auth rotues are for user login and registeration. Profile routes allow users and admin to get, post, and modify user profiles. Trip routes allow users to get recommended bike docks, start a trip, end a trip, and view trip data. 

![API design created on Figma](https://github.com/nonagonyang/evenbike_backend/blob/main/API%20design.png "EvenBike Backend API design")


### External API 
* https://api.tfl.gov.uk/swagger/ui/index.html?url=/swagger/docs/v1#!/BikePoint/BikePoint_GetAll


## Tech Stack
* Javascript
* SQL
* React
* Node.js
* PostgreSQL Database
* Jest
* Supertest
* Material UI


## Author

* Yang Liu
* https://www.linkedin.com/in/yangliu541/
