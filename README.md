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

## How to run
1. Clone the repo
2. Checkout the branch you want to run (or main, for the most recent version);
3. Run `pnpm install` to install dependencies;
4. Create a `.env` file in the root directory based on the included `.env.example` file;
5. Run `pnpm dev` to start the server;
6. Run database migrations (basically data seeders for testing) with `pnpm migrate` (if applicable);
