# NestAPI - NestJS web API to manage todo items
## Table of Content
1. [Introduction](#introduction)
2. [Used versions](#used-versions)
3. [Used tools](#used-tools)
4. [Used packages](#used-packages)
5. [How to run the API](#how-to-run-the-api)\
	5.1. [Build and run with Docker](#build-and-run-with-docker)\
	5.2. [Build and run with SDK](#build-and-run-with-sdk)\
	5.3. [Test and stop](#test-and-stop)
6. [Test and Documentation (Swagger)](#test-and-documentation-swagger)
7. [Limitations](#limitations)\
    7.1. [Exception/error handling](#exception-error-handling)
8. [Some further development possibilities](#some-further-development-possibilities)
9. [Resources](#resources)

## 1. Introduction <a name="introduction"></a>
This is a basic NestJS RESTful web API project written in TypeScript. You can manage your todo items with CRUD operations and it also has a simple user login/account management functionality with JWT authentication. You can register a new user account with your email address, username and password. After successful registration, you can log in and add, edit, remove and track TODO items. You can also edit your account data and delete your account. This app was created for learning purpose, but is might be useful as a starting-point for other projects.
The API uses:
- SQLite database + TypeORM
- node.js (NestJS) RESTful API
- Typescript
- JWT for authentication

If any question, please do not hesitate to contact me.
## 2. Used versions <a name="used-versions"></a>
**1. Framework:**
- Nest.js: v7.0.0

**2. Runtime:**
- node.js runtime: v12.18.3

**3. Database:**
- SQLite: v3
## 3. Used tools <a name="used-tools"></a>
- Postman for API testing
- Git Extensions as git gui
- VSC as text editor
- Docker for containerization
- Windows 10 as OS
## 4. Used packages <a name="used-packages"></a>
- nestjs: 7.0.0,
- express: 4.17.1,
- bcrypt: 5.0.0,
- class-transformer: 0.3.1,
- class-validator: 0.12.2,
- compression: 1.7.4,
- helmet: 4.1.0,
- nestjsx-automapper: 3.0.22,
- passport: 0.4.1,
- passport-jwt: 4.0.0,
- reflect-metadata: 0.1.13,
- rimraf: 3.0.2,
- rxjs: 6.5.4,
- sqlite3: 5.0.0,
- swagger-ui-express: 4.1.4,
- typeorm: 0.2.25
## 5. How to run the API <a name="how-to-run-the-api"></a>
### 5.1. Build and run with Docker <a name="build-and-run-with-docker"></a>
- download and install Docker
- clone or download the content of the repository
- open a terminal and navigate to the containing folder
- write "docker build -t todowebapi:v1 ." and press Enter
- write "docker run -it --rm -p 3000:3000 todowebapi:v1" and press Enter
### 5.2. Build and run with SDK <a name="build-and-run-with-sdk"></a>
- download and install node.js
- clone or download the content of the repository
- open a terminal and navigate to the containing folder
- write "npm install" and press Enter
- after package installation is finished, write "npm start" in the terminal and press Enter
### 5.3. Test and stop <a name="test-and-stop"></a>
- if no error message in the terminal, open your browser (recommended: latest Chrome, Firefox, Safari, Edge Chromium or Chromium) and open: http://localhost:3000/api
- first register a user account, then log in and after that you can manage your TODO items and account
- after testing go back to the terminals and press "Ctrl+C" to stop the web server
## 6. Test and Documentation (Swagger) <a name="test-and-documentation-swagger"></a>
The documentation of the API was created with OpenAPI/Swagger. When you run the app, you can navigate to http://localhost:3000/api. On this URL you can read the documentation, and you can also test the API. (You do not need additional tools such as Curl or Postman.)

The app uses JWT authentication. It means that when you registered an account and got the token, you need to click to the "Authorize" button on the top right corner and insert "Bearer \<yourtoken\>".
(e.g. Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMTUxNWEyZS04MjhlLTQ4MTktYmJkYy1kYTc0NDU0MDFjMzAiLCJqdGkiOiI4MzFiY2ZmZC0xNWMxLTQ5YzEtYWJiMy03NjYyNjU2YzMxYmYiLCJleHAiOjE1ODg2MzExMjQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCJ9.qZCnKIzVth7hS6RrDxNXP3w12h-LeZptdV72eJYxsBw)

!Do not forget to put "Bearer" before your token!

Only after authorization can you manage you TODO items and account.
## 7. Limitations <a name="limitations"></a>
### 7.1. Exception/error handling <a name="exception-error-handling"></a>
This application needs to be extended with exception handling. There are some already known issues which may cause error when it is not used correctly. I only tested the app with correct input values.
## 8. Some further development possibilities <a name="some-further-development-possibilities"></a>
- token refreshing
- Facebook authentication
- Angular frontend
- automated unit and integration tests
- adding roles (admin, user)
## 9. Resources <a name="resources"></a>
There are several online source which I used to create this web app.\
Including but not limited to:
- https://docs.nestjs.com/
- https://typeorm.io/
- https://www.codemag.com/Article/1907081/Nest.js-Step-by-Step
- https://medium.com/@kaushiksamanta23/nest-js-tutorial-series-part-1-introduction-setup-c87ba810ea9e
- https://www.techiediaries.com/nestjs-tutorial-rest-api-crud/
- https://codersera.com/blog/typeorm-with-nest-js-tutorial/
- https://dev.to/abbasogaji/how-to-dockerize-your-nestjs-app-for-production-2lmf

Thank to every hero on Stackoverflow and Github who helped me with their comments! (Not all heroes wear capes.)
