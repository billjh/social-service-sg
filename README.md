# Social Service SG

A web platform that connects social services events organizers with volunteers in Singapore.

## Instructions

### To run to server
- Install NodeJS v4.2.2 and NPM
  - Install dependencies by ```npm install```
- MongoDB
  - Start MongoDB server
  - To reset databse, refer to reset_database.js
- Start Server by ```node server.js```

### To update Semantic UI
- Update by ```npm update```
- Make sure Gulp has been installed globally ```npm install -g gulp```
- Generate CSS and JS ```cd public/semantic/ & gulp build```
