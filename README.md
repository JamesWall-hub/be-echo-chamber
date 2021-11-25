# James' Echo Chamber API project

## Introduction

Hi! Welcome to my Echo Chamber API project!

## The hosted version of this API can be found at https://be-echo-chamber.herokuapp.com/api

## Project summary

This project is inspired by the popular discussion site Reddit, and aims to emulate it's back end, with implementation and consideration of the following:

- Using a Node.js Web Server App.
- RESTful APIs and data transfer.
- PostGresSQL databases and Express servers.
- MVC architecture.
- Error handling.
- All implemented through Test Driven Development.

It is written using:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/) as web server app framework.
- [postGresSQL](https://www.postgresql.org/) as the underpinning database.
- [Node-PG](https://www.npmjs.com/package/pg) for interacting with postGres.
- [Jest](https://jestjs.io/), [jest-sorted](https://www.npmjs.com/package/jest-sorted) & [supertest](https://www.npmjs.com/package/supertest) for TDD testing.
- [Github](https://github.com/) and [Heroku](https://heroku.com/) for git version control and hosting.

## Minimum requirements for running this project

You will need to have the following packages installed to download and work with this project:

- Node.js v16.8.0 - Install instructions [Here](https://nodejs.dev/learn/how-to-install-nodejs)
- postGreSQL v12.8, server 10.18 - Install instructions [Here](psql-install-instructions.md)
- A code editor such as [VSCode](https://code.visualstudio.com/)

## Cloning and testing this project

1. To get started, navigate to the directory of your choice and run this shell command in your terminal:

```bash
git clone https://github.com/JamesWall-hub/be-echo-chamber.git
```

You will be asked to enter your git login details and access token.

2. Open the repo folder in your code editor of choice and run the following commands in the terminal:

```bash
npm install
npm install --dev
```

This will install all node packages required for normal running of the repo, including devDependencies such as the testing modules.

3. To set up the development and testing databases run this command:

```bash
npm run setup-dbs
```

This will create the databases `nc_news` and `nc_news_test` in your local instance of PostgreSQL

4. Next, you will need to create two `.env`, this will ensure the right database is seeded when a development or test script is run.
   in the root directory of the repo, create the following two files:

- `.env.development`:
  edit the file to add this single line:

```env
PGDATABASE=nc_news
```

- `.env.test`:
  edit the file to add this single line:

```env
PGDATABASE=nc_news_test
```

5. Once these files have been created, running the seed script will populate our development database! Run the following command:

```bash
npm run seed
```

6. Run the following command to view the test suite located in `__tests__/app.test.js`:

```bash
npm test app
```