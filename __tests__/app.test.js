const db = require('../db/index.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require("../app.js")

beforeEach(() => seed(testData));
afterAll(() => db.end())


describe("APP", () => {
    describe("GET /api/topics", () => {
        test("status 200: responds with an array of topics", () => {
            return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body: {topics}}) => {
                expect(topics).toHaveLength(3);
                    topics.forEach((topic)=>{
                        expect(topic).toMatchObject({
                            description: expect.any(String),
                            slug: expect.any(String) 
                        }) 
                    })              
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
        test("status 404: responds with route not found for valid id that does not exist yet", () => {
            return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Route not found")
            })
        })
    })
})
