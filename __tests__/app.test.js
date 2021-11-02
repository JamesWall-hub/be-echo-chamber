const db = require('../db/index.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require("../app.js")

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("APP", ()=>{
    test("status 404: responds with route not found for invalid path", () => {
        return request(app)
        .get("/notapath")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("Route not found")
        })
    })
    describe("GET api/topics", () => {
        test("status 200: responds with an array of topics", () => {
            return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body: {topics}}) => {
                console.log(topics)
                expect(topics).toHaveLength(3);
                    topics.forEach((topic)=>{
                        expect(topic).toMatchObject({
                            description: expect.any(String),
                            slug: expect.any(String) 
                        }) 
                    })              
            })
        })
    })
})
