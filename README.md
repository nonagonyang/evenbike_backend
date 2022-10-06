# EvenBike 

## About

EvenBike helps to make public biking system more eco-friendly . Many cities in the world now have implemented public bike systems. However, one of the problems with the bike-sharing system is that bikes need to be redistributed usually at the end of the day to ensure enough bikes in popular locations. With mobile-first design in mind, EvenBike, a web application, enables public bike riders to help rebalance the number of bikes in each bike dock, reducing the need to redistribute bikes with trucks. 

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
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FiEGk39P20XTJU9W2MXF0JZ%2Fuserflow-EvenBike%3Fnode-id%3D0%253A1" allowfullscreen></iframe>


## Author

* Yang Liu
* https://www.linkedin.com/in/yangliu541/
