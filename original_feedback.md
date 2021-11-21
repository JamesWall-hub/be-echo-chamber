# James

## seed

- consider extracting out table creations/drops/insertions into their own functions to tidy things up

## routes

- you're declaring a brand new func for each 405. Why not declare it and pass in the reference?

## models
- `readEndPoints` - no need to read the file. just require it in your controller! also you're passing the promise readfile a callback?
- ` return Promise.reject({status: 404, msg: "Route not found"})` this is not caused by a invalid route, the article can't be found.

## misc
- remember to add a readme and remove unnecessary `.md` files when you're done with them.



## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### ESSENTIAL GET `/api/articles?sort_by=author`

Assertion: Cannot read properties of undefined (reading '0')

Hints:
- accept a `sort_by` query, with a value of any column name
- use `author` for the column to store the username that created the article


### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected 202 to equal 200

Hints:
- use a 200: OK status code for successful `patch` requests


### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected 422 to equal 200

Hints:
- ignore a `patch` request with no information in the request body, and send the unchanged article to the client


### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected 422 to equal 400

Hints:
- use a 400: Bad Request status code when sent an invalid `inc_votes` value


### ESSENTIAL POST `/api/articles/1/comments`

Assertion: expected 422 to equal 400

Hints:
- use a 400: Bad Request status code when `POST` request does not include all the required keys


### FURTHER GET `/api/users/not-a-username`

Assertion: expected 200 to equal 404

Hints:
- if a user is not found with a valid `user_id`, use a 404: Not Found status code


### FURTHER PATCH `/api/comments/1`

Assertion: expected 202 to equal 200

Hints:
- use a 200: OK status code for successful `patch` requests


### FURTHER PATCH `/api/comments/1`

Assertion: expected 422 to equal 400

Hints:
- use a 400: Bad Request status code when sent an invalid `inc_votes` value


### FURTHER PATCH `/api/comments/1`

Assertion: expected 422 to equal 200

Hints:
- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body


### FURTHER PATCH `/api/comments/1000`

Assertion: expected 202 to equal 404

Hints:
- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist


### FURTHER PATCH `/api/comments/1`

Assertion: expected 422 to equal 400

Hints:
- use a 400: Bad Request status code when sent an invalid `inc_votes` value




## Readme - Remove the one that was provided and write your own

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [ ] .gitignore the `.env` files

## Connection to db

- [ ] Throw error if `process.env.PGDATABASE` is not set

## Creating tables

- [ ] Use `NOT NULL` on required fields
- [ ] Default `created_at` in articles and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
- [ ] Delete all comments when the article they are related to is deleted: Add `ON DELETE CASCADE` to `article_id` column in `comments` table.

## Inserting data

- [ ] Drop tables and create tables in seed function

## Tests

- [ ] Seeding before each test
- [ ] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [ ] Ensure all tests are passing
- [ ] Cover all endpoints and errors

- `GET /api/topics`

  - [ ] Status 200, array of topic objects

- `GET /api/articles/:article_id`

  - [ ] Status 200, single article object (including `comment_count`)
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999

- `PATCH /api/articles/:article_id`

  - [ ] Status 200, updated single article object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing

- `GET /api/articles`

  - [ ] Status 200, array of article objects (including `comment_count`, excluding `body`)
  - [ ] Status 200, default sort & order: `created_at`, `desc`
  - [ ] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [ ] Status 200, accepts `order` query, e.g. `?order=desc`
  - [ ] Status 200, accepts `topic` query, e.g. `?topic=coding`
  - [ ] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [ ] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [ ] Status 404. non-existent `topic` query, e.g. `?topic=bananas`
  - [ ] Status 200. valid `topic` query, but has no articles responds with an empty array of articles, e.g. `?topic=paper`

- `GET /api/articles/:article_id/comments`

  - [ ] Status 200, array of comment objects for the specified article
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, valid ID, but has no comments responds with an empty array of comments

- `POST /api/articles/:article_id/comments`

  - [ ] Status 201, created comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing required field(s), e.g. no username or body properties
  - [ ] Status 404, username does not exist
  - [ ] Status 201, ignores unnecessary properties

- `GET /api`

  - [ ] Status 200, JSON describing all the available endpoints

## Routing

- [ ] Split into api, topics, users, comments and articles routers
- [ ] Use `.route` for endpoints that share the same path

## Controllers

- [ ] Name functions and variables well
- [ ] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- Protected from SQL injection
  - [ ] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - [ ] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [ ] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ] Use `LEFT JOIN` for comment counts

## Errors

- [ ] Use error handling middleware functions in app and extracted to separate directory/file
- [ ] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Tasks - To be completed after hosting

- `DELETE /api/comments/:comment_id`

- [ ] Status 204, deletes comment from database
- [ ] Status 404, non existant ID, e.g 999
- [ ] Status 400, invalid ID, e.g "not-an-id"

- `GET /api/users`

- [ ] Status 200, responds with array of user objects

- `GET /api/users/:username`

- [ ] Status 200, responds with single user object
- [ ] Status 404, non existant ID, e.g 999
- [ ] Status 400, invalid ID, e.g "not-an-id"

- `PATCH /api/comments/:comment_id`

  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit an article body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an article by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get articles created in last 10 minutes
- [ ] Get: Get all articles that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for topics
