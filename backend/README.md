# Getting Started

## Environment

This project was built on Nodejs 14, please make sure your nodejs version has been upgraded to 14 or later.

## Boostrap

### Recommand `npm ci` to setup the project. 

If the package-lock.json is missing, run `npm i` instead. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server with ts-node on [http://localhost:80](http://localhost:30). \
You will see `start successfully at ===> localhost:80` in console when the server startup successfully


### `npm test`

Launches the test runner base on mocha & chai 

## API Introduction

### Signup

`POST /api/signup -d { nickname: /([a-zA-Z]|\d){1,32}/ }`

Create a user with an unique nickname

response 
  - 200: `{ user: { nickname: string, _id: uuid }, accessToken: string, scopes: ['*'] }`
  - 400: Invalid paramters such as body.nickname is invalid
  - 409: Duplicated nickname

### Signin

`POST /api/signin -d { nickname: /([a-zA-Z]|\d){1,32}/ }`

If the user can be identified by the `nickname` retunr an access token

response
  - 200: `{ user: { nickname: string, _id: uuid }, accessToken: string, scopes: ['*'] }`
  - 400: Invalid paramters such as body.nickname is invalid
  - 404: Not Found! (User doesn't exist)
  - 
### Inspect

`GET /api/inspect -H Authorization:<accessToken>`

Inspect the access token

response
  - 200: `{ user: { nickname: string, _id: uuid }, scopes: ['*'] }`
  - 401: Not Authorized (invalid or expired (10 min) token))
  - 403: Forbbiden (user has been revoked by a certain reason)

### Update calling user

`PUT /api/users/me -d { nickname: /([a-zA-Z]|\d){1,32}/ } -H Authorization:<accessToken>`

Update the nickname of calling user

response
  - 200: `{ user: { nickname: string, _id: uuid } }`
  - 401: Not Authorized (invalid or expired (10 min) token))
  - 403: Forbbiden (user has been revoked by a certain reason)
  - 400: Invalid paramters such as body.nickname is invalid
  - 409: Duplicated nickname
