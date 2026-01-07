# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

<!-- The Purpose and Functionalities of this Sprint 12 Project -->

This project is focussed on creating my own back-end server for my previous project 11 called What to Waer (WTWR). As a first-timer i mostly focussed on the theory by understanding the details this back-end entails. A project folder was provided to me which had some few files like Eslint, package.json and other releevant files for the initial start. i also later formatted the Eslinter to could accept underscore ID (\_id) and give a warning when there is a console.log instaed of console.error.

I installed express.js and mongoBD as well as mongoose dependdncies since this projecrt is an entirely express project, before doing all this i had already downloaded my Postman and MongoDB camposs which are the tools for testing the server to see how errors and handle properly before any deployment.

I started by creating 3 differnt folders for Controllers, Models, and Routes which works together with diffferent purposes and i will talk about them separately as follows.

1. Controllers: As the name sounds it literaly controls the entire server, controller contains all the creating, reading, updating and deleting logics and most functionalities, this is where errors are handled properly. I say that controllers act like the brain of my app because that where requests are made and responses are processed.

2. Models: On the other hand defines what my data may look like and how it is stored in my database, lemme use ClothingItem model as an example, this model defines fields like name, weather, imageUrl, owner plus all their validation rules. And this is where Mongoose.schema is use, models seems to me as blue-print for mongoDB.

3. Routes: Finally, after we got our logics(controllers) ans how our data should look like(Model), routes are created which is the endpoints of our database(API's). this route act like a traffic controller, it matches the requested Url to the correct controller.

<!-- The Purpose and Functionalities of Sprint 13 (Actual Middleware and Authoriztion (PROTECTION)) -->

1. This is the continuetion of sprint 12. In this project my user schemer was expanded to include an email and password to our users. And some libraries like "bcrypt" and "jsonwebtoken(jwt)" was installed for authorization and authenicating these emails and password. They have to be valid email and passwords, both are also required for a new user to sign in my database.

2. I Created an actual middleware for this database for getting the current users and updating name and avatar, that if the user does not have the token from the middleware(authorization token) they can not get any information of the current user.

3. Again my createUser function was updated to include email and password, the endpoint was changed to signup, basically before you can create a new user it requires you to use valid email, password etc to sign up as a new user.

4. A user login was created with the endpoint signin, which requires only email and password, during this process i have to hash the password and validate the email. This is where a user can login for an authorized token to get the currentUser.

5. I also created the updateCurrentUser function takes only name and avatar to update the current user but protected with an authorization. So before you can update the corrent user you need a valid token to be authorized
   overall it was very interesting and challenging project which made me learn how to create actual middleware(auth.js) to protect my routes

## Sprint 15 Projcet

1. Frontend link to my Repo
   https://github.com/oppong122/se_project_react.git

2. Check this vidoe
   https://drive.google.com/file/d/16eMCujExn085V3qYCRNuFfJ2rZ5EP7FD/view?usp=share_link where I describe my
   project and some challenges I faced while building it.

3. My backend Domain
   https://api.wtwr-demonstration.chickenkiller.com
