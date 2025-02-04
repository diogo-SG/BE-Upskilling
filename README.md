# BE-Upskilling

## Branches
Each branch on this repo is dedicated to a different part of the upskilling programme:

* [http-server](https://github.com/diogo-SG/BE-Upskilling/tree/http-server) - file system manipulation and basic server setup and routing using pure Node.js (no Express)
* [express-server](https://github.com/diogo-SG/BE-Upskilling/tree/express-server) - mock user api setup with logging and error handling middleware
* [express-validator](https://github.com/diogo-SG/BE-Upskilling/tree/express-validator) - user api with validation middleware using express-validator
* [postgres-integration](https://github.com/diogo-SG/BE-Upskilling/tree/postgres-integration) - user api with postgres integration and migrations using db-migrate-pg
* [typeORM-integration](https://github.com/diogo-SG/BE-Upskilling/tree/typeORM-integration) - user api with typeORM integration and migrations using typeORM
* [jwt-authentication](https://github.com/diogo-SG/BE-Upskilling/tree/jwt-authentication) - implementing JWT authentication on the api
* [docker-implementation](https://github.com/diogo-SG/BE-Upskilling/tree/docker-implementation) - containerising the api with Docker
* [jest-testing](https://github.com/diogo-SG/BE-Upskilling/tree/jest-testing) - adding tests to the api using Jest and a test database, as well as API response pagination
* [various-fixes](https://github.com/diogo-SG/BE-Upskilling/tree/jest-testing) - various fixes and improvements to the codebase - see commits for full list.

## How to run
1. Clone the repo
2. Checkout the branch you want to run (or main, for the most recent version);
3. Run `pnpm install` to install dependencies;
4. Create a `.env` file in the root directory based on the included `.env.example` file;
5. Run `pnpm dev` to start the server. If running for the first time, this will also create a database with the name specified in the `.env` file;
6. Run database migrations (basically data seeders for testing) with `pnpm migrate` (if applicable);

## Postman Workspace
* [BE-Upskilling](https://www.postman.com/material-participant-91137193/workspace/diogo-be-upskilling) - Postman workspace with all the requests for the different routes

## Testing
* Run `pnpm test` to run the tests with Jest. Only tests for Users and Orders have been created. All tests are run against a test database, so no data is lost in the main database. The test database is created and destroyed for each test suite, which means they can take a little while to run.

