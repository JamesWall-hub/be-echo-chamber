const db = require('../db/index.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require("../app.js")

beforeEach(() => seed(testData));
afterAll(() => db.end())


describe("APP", () => {
    describe("GET /api", () => {
        test("status 200: responds with JSON of all endpoints", () => {
            return request(app)
            .get("/api")
            .expect(200)
            .then(({body}) => {
                expect(body.endpoints).toMatchObject(
                    {
                    
                            'GET /api': expect.any(Object),
                            'GET /api/topics': expect.any(Object),
                            'GET /api/articles': expect.any(Object),
                            'GET /api/articles/:article_id': expect.any(Object),
                            'PATCH /api/articles/:article_id': expect.any(Object),
                            'GET /api/articles/:article_id/comments': expect.any(Object),
                            'POST /api/articles/:article_id/comments': expect.any(Object),
                            'DELETE /api/comments/:comment_id': expect.any(Object),
                        
                    })
            })
        })
    })
    describe("GET /api/topics", () => {
        test("status 200: responds with an array of topics", () => {
            return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body}) => {
                expect(body.topics).toHaveLength(3);
                body.topics.forEach((topic) => {
                    expect(topic).toMatchObject({
                    description: expect.any(String),
                    slug: expect.any(String)
                    });
                });
            })
            
        })
        test("status 404: responds with route not found for invalid path", () => {
            return request(app)
            .get("/notapath")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Route not found")
            })
        })
        test("status 405: responds with method not allowed for unspecified method", () => {
            return request(app)
            .delete("/api/topics")
            .expect(405)
            .then(({body}) => {
                expect(body.msg).toBe("Method not allowed")
            })
        })
    })
    describe("GET /api/articles/:article_id", () => {
        test("status 200: responds with corresponding article when passed valid id", () => {
            return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({body}) => {
                expect(body.article).toMatchObject(
                    {
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        body: 'I find this existence challenging',
                        votes: 100,
                        topic: 'mitch',
                        author: 'butter_bridge',
                        created_at: expect.any(String),
                        comment_count: 11
                    })
            })
        })
        test("status 400: responds with error message for invalid query", () => {
            return request(app)
            .get("/api/articles/NaN")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
            })
        })
        test("status 404: responds with article not found for valid id that does not exist yet", () => {
            return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Article not found")
            })
        })
        test("status 405: responds with method not allowed for unspecified method", () => {
            return request(app)
            .put("/api/articles/1")
            .expect(405)
            .then(({body}) => {
                expect(body.msg).toBe("Method not allowed")
            })
        })
    })
    describe("PATCH /api/articles/:article_id", () => {
        test("status 200: responds with specified article and updated vote amount", () => {
            return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 40 })
            .expect(200)
            .then(({body}) => {
                expect(body.article).toEqual(
                    {
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        body: 'I find this existence challenging',
                        votes: 140,
                        topic: 'mitch',
                        author: 'butter_bridge',
                        created_at: expect.any(String),
                        comment_count: 11
                    })
            })
        })
        test("status 200: ignores a patch request with no information in body and sends article", () => {
            return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(200)
            .then(({body}) => {
                expect(body.article).toEqual(
                    {
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        body: 'I find this existence challenging',
                        votes: 100,
                        topic: 'mitch',
                        author: 'butter_bridge',
                        created_at: expect.any(String),
                        comment_count: 11
                    })
            })
        })
        test("status 400: responds with error message for invalid query", () => {
            return request(app)
            .patch("/api/articles/NaN")
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
            })
        })
        test("status 400: responds with bad request for invalid request body", () => {
            return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "NaN" })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad request")
            })
        })
        test("status 404: responds with article not found for valid id that does not exist yet", () => {
            return request(app)
            .patch("/api/articles/999")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Article not found")
            })
        })
    })
    describe("GET /api/articles", () => {
        test("status 200: responds with an array of articles ordered by date descending by default", () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body}) => {
                expect(body.articles).toBeSortedBy("created_at", {descending: true})
            })
        })
        test("status 200: responds with an array of articles with a length of up to 10 by default", () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body}) => {
                expect(body.articles).toHaveLength(10)
            })
        })
        test("status 200: responds with an array of articles matching limit query", () => {
            return request(app)
            .get("/api/articles?limit=4")
            .expect(200)
            .then(({body}) => {
                expect(body.articles).toHaveLength(4)
            })
        })
        test("status 200: responds with an array of articles matching page query", () => {
            return request(app)
            .get("/api/articles?p=2")
            .expect(200)
            .then(({body}) => {
                expect(body.articles).toHaveLength(2)
            })
        })
        test("status 200: responds with an array of articles matching sort_by and order query", () => {
            return request(app)
            .get("/api/articles?sort_by=comment_count&order=asc")
            .expect(200)
            .then(({body}) => {
                expect(body.articles).toBeSortedBy("comment_count", {ascending: true})
            })
        })
        test("status 200: responds with an array of articles matching topic query", () => {
            return request(app)
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then(({body}) => {
                expect(body.articles).toHaveLength(10)
                body.articles.forEach((article) => {
                    expect(article.topic).toBe("mitch")
                })
            })
        })
        test("status 200: responds with an empty array for a topic with no articles", () => {
            return request(app)
            .get("/api/articles?topic=paper")
            .expect(200)
            .then(({body}) => {
                expect(body.articles).toEqual([])
            })
        })
        test("status 400: responds with invalid sort_by query", () => {
            return request(app)
            .get("/api/articles?sort_by=article_id")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid sort_by query")
            })
        })
        test("status 400: responds with invalid order query", () => {
            return request(app)
            .get("/api/articles?order=article_id")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid order query")
            })
        })
        test("status 400: responds with invalid input for invalid limit query", () => {
            return request(app)
            .get("/api/articles?limit=NaN")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
            })
        })
        test("status 400: responds with invalid input for invalid page query", () => {
            return request(app)
            .get("/api/articles?p=NaN")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
            })
        })
        test("status 404: responds with topic not found for a valid topic that does not exist yet", () => {
            return request(app)
            .get("/api/articles?topic=ifeelbadformitch")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Topic not found")
            })
        })
        test("status 405: responds with method not allowed for unspecified method", () => {
            return request(app)
            .put("/api/articles")
            .expect(405)
            .then(({body}) => {
                expect(body.msg).toBe("Method not allowed")
            })
        })
    })
    describe("GET /api/articles/:article_id/comments", () => {
        test("status 200: responds with an array of comments matching article id", () => {
            return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({body}) => {
                expect(body.comments).toHaveLength(11);
                body.comments.forEach((comment) => {
                    expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String)
                    });
                });
            })
        })
        test("status 200: responds with an empty array for an article with no comments", () => {
            return request(app)
            .get("/api/articles/2/comments")
            .expect(200)
            .then(({body}) => {
                expect(body.comments).toEqual([])
            })
        })
        test("status 400: responds with error message for invalid query", () => {
            return request(app)
            .get("/api/articles/NaN/comments")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
            })
        })
        test("status 404: responds with article not found for valid id that does not exist yet", () => {
            return request(app)
            .get("/api/articles/999/comments")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Article not found")
            })
        })
        test("status 405: responds with method not allowed for unspecified method", () => {
            return request(app)
            .delete("/api/articles/1/comments")
            .expect(405)
            .then(({body}) => {
                expect(body.msg).toBe("Method not allowed")
            })
        })
    })
    describe("POST /api/articles/:article_id/comments", () => {
        test("status 201: responds with the created comment", () => {
            return request(app)
            .post("/api/articles/1/comments")
            .send({
                username: "butter_bridge",
                body: "dot to be or dot not to be"
            })
            .expect(201)
            .then(({body}) => {
                expect(body.comment.author).toBe("butter_bridge")
                expect(body.comment.body).toBe("dot to be or dot not to be")
                });
            })
        test("status 400: responds with error message for invalid id", () => {
            return request(app)
            .post("/api/articles/NaN/comments")
            .send({
                username: "butter_bridge",
                body: "dot to be or dot not to be"
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
                })
            })
        test("status 400: responds with bad request for invalid request body", () => {
            return request(app)
            .post("/api/articles/1/comments")
            .send({
                body: "dot to be or dot not to be"
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad request")
            })
        })
        test("status 404: responds with route not found for valid id that does not exist yet", () => {
            return request(app)
            .post("/api/articles/999/comments")
            .send({
                username: "butter_bridge",
                body: "dot to be or dot not to be"
            })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Route not found")
            })
        })
    })
    describe("DELETE /api/comments/:comment_id", () => {
        test("status 204: responds with no content and deletes specified comment", () => {
            return request(app)
            .delete("/api/comments/1")
            .expect(204)
        })
        test("status 400: responds with error message for invalid query", () => {
            return request(app)
            .delete("/api/comments/NaN")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
            })
        })
        test("status 404: responds with comment not found for valid id that does not exist yet", () => {
            return request(app)
            .delete("/api/comments/999")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Comment not found")
            })
        })
        test("status 405: responds with method not allowed for unspecified method", () => {
            return request(app)
            .put("/api/comments/1")
            .expect(405)
            .then(({body}) => {
                expect(body.msg).toBe("Method not allowed")
            })
        })
    })
    describe("GET /api/users", () => {
        test("status 200: responds with an array of users", () => {
            return request(app)
            .get("/api/users")
            .expect(200)
            .then(({body}) => {
                expect(body.users).toHaveLength(4);
                body.users.forEach((user) => {
                    expect(user).toMatchObject({
                    username: expect.any(String)
                    });
                });
            })
        })
        test("status 404: responds with route not found for invalid path", () => {
            return request(app)
            .get("/api/user")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Route not found")
            })
        })
        test("status 405: responds with method not allowed for unspecified method", () => {
            return request(app)
            .delete("/api/users")
            .expect(405)
            .then(({body}) => {
                expect(body.msg).toBe("Method not allowed")
            })
        })
    })
    describe("GET /api/users/:username", () => {
        test("status 200: responds with corresponding user when searched by username", () => {
            return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({body}) => {
                expect(body.user).toEqual({
                        username: 'butter_bridge',
                        name: 'jonny',
                        avatar_url:
                          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'    
                })
            })
        })
        test("status 404" , () => {
            return request(app)
            .get("/api/users/not-a-user")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Route not found")
            })
        })
        test("status 404: responds with route not found for valid id that does not exist yet", () => {
            return request(app)
            .get("/api/user/1")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Route not found")
            })
        })
        test("status 405: responds with method not allowed for unspecified method", () => {
            return request(app)
            .put("/api/users/butter_bridge")
            .expect(405)
            .then(({body}) => {
                expect(body.msg).toBe("Method not allowed")
            })
        })
    })
    describe("PATCH /api/comments/:comment_id", () => {
        test("status 200: responds with specified comment and updated vote amount", () => {
            return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 40 })
            .expect(200)
            .then(({body}) => {
                expect(body.comment).toEqual(
                    {
                        comment_id: 1,
                        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                        votes: 56,
                        author: "butter_bridge",
                        article_id: 9,
                        created_at: expect.any(String),
                      })
            })
        })
        test("status 200: responds with specified comment when sent empty request body", () => {
            return request(app)
            .patch("/api/comments/1")
            .send({})
            .expect(200)
            .then(({body}) => {
                expect(body.comment).toEqual(
                    {
                        comment_id: 1,
                        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                        votes: 16,
                        author: "butter_bridge",
                        article_id: 9,
                        created_at: expect.any(String),
                      })
            })
        })
        test("status 400: responds with bad request for invalid request body", () => {
            return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: "NaN" })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad request")
            })
        })
        test("status 404: responds with route not found for valid id that does not exist yet", () => {
            return request(app)
            .patch("/api/comments/999")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Route not found")
            })
        })
    })
    describe("POST /api/articles", () => {
        test("status 201: responds with the created article", () => {
            return request(app)
            .post("/api/articles")
            .send({
                author: "butter_bridge",
                title: "test",
                body: "this is a test",
                topic: "mitch"
            })
            .expect(201)
            .then(({body}) => {
                expect(body.article).toMatchObject(
                    {
                        article_id: expect.any(Number),
                        title: 'test',
                        body: 'this is a test',
                        votes: 0,
                        topic: 'mitch',
                        author: 'butter_bridge',
                        created_at: expect.any(String),
                        comment_count: 0
                    })
            })
        })
        test("status 400: responds with bad request for invalid request body", () => {
            return request(app)
            .post("/api/articles")
            .send({
                body: "missing some requirements"
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad request")
            })
        })
    })
    describe("POST /api/topics", () => {
        test("status 201: responds with the created topic", () => {
            return request(app)
            .post("/api/topics")
            .send(
                {
                    slug: "test topic",
                    description: "test description"
                  }
            )
            .expect(201)
            .then(({body}) => {
                expect(body.topic).toMatchObject(
                    {
                        slug: "test topic",
                        description: "test description"
                    })
            })
        })
        test("status 400: responds with bad request for invalid request body", () => {
            return request(app)
            .post("/api/topics")
            .send({
                body: "missing slug"
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad request")
            })
        })
    })
    describe("DELETE /api/articles/:article_id", () => {
        test("status 204: responds with no content and deletes specified comment", () => {
            return request(app)
            .delete("/api/articles/1")
            .expect(204)
        })
        test("status 400: responds with error message for invalid query", () => {
            return request(app)
            .delete("/api/articles/NaN")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
            })
        })
        test("status 404: responds with article not found for valid id that does not exist yet", () => {
            return request(app)
            .delete("/api/articles/999")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Article not found")
            })
        })
    })
})
