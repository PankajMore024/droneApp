Drone Survey Mapping System

Kindly Run Both Frontend & Backend folders seperately in 2 VS Code windows.
install dpenednecies for both with npm i as node_modules are in .gitignore
Frontend terminal command - npm start
Backend terminal command - npm run dev

Test user login - pankaj@flytbase.com 123456

This project aims to create a back-end system for managing drones, missions, and sites for a large corporation involved in surveying and mapping its campuses/sites using drones.

Table of Contents
Features
Prerequisites
Installation
Usage
Technologies Used
Contributing
License

Features
The app provides sign in for new users and login for existing users. Previously signed in users will be redirected to the login page.
The app lets the user in session add drones in their Drone section. They can also delete the drones and the same are removed from the database. 
The drones created are user-linked and are retrieved on the viewport once they log back in the app.
All the API’s across the app are handled with JWT authorization.
In a couple of instances, React props are used too.

Prerequisites
The app is subject to dependency installation from node package manager.
Packages to be installed for React : react-router-dom
Packages to be installed for Node : express, body-parser, cors, mongoose, jsonwebtoken

Installation
Install all the above mentioned packages. Additionally, I recommend to replicate the MongoDB data in Mongo Compass to set up the collections (drones and users)

Technologies Used
React.js
Node.js
Express.js
MongoDB