const db = require('../db/index.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require("../app.js")

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("APP", ()=>{
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
         test("status 400: when provided an invalid topic")
    })
})

// test 400 for invalid url