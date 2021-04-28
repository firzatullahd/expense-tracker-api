# Expense Tracker API

## Overview

Expense Tracker API, a very simple RESTful API built to support Expense Tracker App. Expense Tracker API was developed on Node JS, Mongoose, and MongoDB.

Few functionalities of Expense Tracker API:

1. Authentication (Register and Login User)
2. Add, Delete, and Get Products based on logged in user

## Getting Started

### 1.1 Prerequisites

To get started, ensure that you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)

### 1.2. Run locally

- Clone repository or clone your own fork

  ```bash
  git clone https://https://github.com/firzatullahd
  ```

- Make a duplicate of `config.env.example` and rename to `config.env`, then configure your credentials.
- Install dependencies by running `yarn` or `npm install` on your terminal.
- Run command: `yarn dev` or `npm run dev` to start the development mode on `localhost:5000`

## HTTP requests

There are 3 basic HTTP requests that you can use in this API:

- `POST` Create a resource
- `GET` Get list of resources
- `DELETE` Delete a resource

## HTTP Responses

Each response will include a code(response code),message,status and data object that can be single object or array depending on the query.

## HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `201` `Created` Resource has been created
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred
