# James

## seed

- missing a few `NOT NULL` constraints you might find helpful for error handling
- consider extracting out table creations/drops/insertions into their own functions to tidy things up
- nice and tidy otherwise!

## routes
- nice use of `.route`
- nice and organised
- you're declaring a brand new func for each 405. Why not declare it and pass in the reference?


## models
- `readEndPoints` - no need to read the file. just require it in your controller! also you're passing the promise readfile a callback?

## misc
- remove console.logs!
- remember to add a readme and remove unnecessary `.md` files when you're done with them.



## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### ESSENTIAL GET `/api/articles?sort_by=author`

Assertion: Cannot read properties of undefined (reading '0')

Hints:
- accept a `sort_by` query, with a value of any column name
- use `author` for the column to store the username that created the article




## Readme - Remove the one that was provided and write your own

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ x ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [ x ] .gitignore the `.env` files

## Connection to db

- [ x ] Throw error if `process.env.PGDATABASE` is not set

## Creating tables

- [ x ] Use `NOT NULL` on required fields
- [ x ] Default `created_at` in articles and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
- [ x ] Delete all comments when the article they are related to is deleted: Add `ON DELETE CASCADE` to `article_id` column in `comments` table.

## Inserting data

- [ x ] Drop tables and create tables in seed function

## Tests

- [ x ] Seeding before each test
- [ x ] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [ ] Ensure all tests are passing
- [ ] Cover all endpoints and errors

- `GET /api`

  - [ ] Status 200, JSON describing all the available endpoints

- `GET /api/topics`

  - [ x ] Status 200, array of topic objects

- `GET /api/articles/:article_id`

  - [ x ] Status 200, single article object (including `comment_count`)
  - [ x ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ x ] Status 404, non existent ID, e.g. 0 or 9999

- `PATCH /api/articles/:article_id`

  - [ x ] Status 200, updated single article object
  - [ x ] Status 200, ignores empty request body
  - [ x ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ x ] Status 404, non existent ID, e.g. 0 or 9999
  - [ x ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing

- `GET /api/articles`

  - [ x ] Status 200, array of article objects (including `comment_count`, excluding `body`)
  - [ x ] Status 200, default sort & order: `created_at`, `desc`
  - [ x ] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [ x ] Status 200, accepts `order` query, e.g. `?order=desc`
  - [ x ] Status 200, accepts `topic` query, e.g. `?topic=coding`
  - [ x ] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [ x ] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [ x ] Status 404. non-existent `topic` query, e.g. `?topic=bananas`
  - [ x ] Status 200. valid `topic` query, but has no articles responds with an empty array of articles, e.g. `?topic=paper`

- `GET /api/articles/:article_id/comments`

  - [ x ] Status 200, array of comment objects for the specified article
  - [ x ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ x ] Status 404, non existent ID, e.g. 0 or 9999
  - [ x ] Status 200, valid ID, but has no comments responds with an empty array of comments

- `POST /api/articles/:article_id/comments`

  - [ x ] Status 201, created comment object
  - [ x ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ x ] Status 404, non existent ID, e.g. 0 or 9999
  - [ x ] Status 400, missing required field(s), e.g. no username or body properties
  - [ x ] Status 404, username does not exist
  - [ ? ] Status 201, ignores unnecessary properties

  - `DELETE /api/comments/:comment_id`

- [ x ] Status 204, deletes comment from database
- [ x ] Status 404, non existant ID, e.g 999
- [ x ] Status 400, invalid ID, e.g "not-an-id"

- `GET /api/users`

- [ x ] Status 200, responds with array of user objects

- `GET /api/users/:username`

- [ x ] Status 200, responds with single user object
- [ x ] Status 404, non existant ID, e.g 999
- [ ? ] Status 400, invalid ID, e.g "not-an-id"

- `PATCH /api/comments/:comment_id`

  - [ x ] Status 200, updated single comment object
  - [ x ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ x ] Status 404, non existent ID, e.g. 0 or 9999
  - [ x ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing


## Routing

- [ x ] Split into api, topics, users, comments and articles routers
- [ x ] Use `.route` for endpoints that share the same path

## Controllers

- [ x ] Name functions and variables well
- [ x ] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- Protected from SQL injection
- [ x ] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
- [ x ] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [ x ] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ x ] Use `LEFT JOIN` for comment counts

## Errors

- [ x ] Use error handling middleware functions in app and extracted to separate directory/file
- [ x ] Consistently use `Promise.reject` in either models _**OR**_ controllers


## Extra Advanced Tasks

### Easier

- [ x ] Patch: Edit an article body
- [ x ] Patch: Edit a comment body
- [ x ] Patch: Edit a user's information
- [ ] Get: Search for an article by title
- [ x ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get articles created in last 10 minutes
- [ ] Get: Get all articles that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for topics
