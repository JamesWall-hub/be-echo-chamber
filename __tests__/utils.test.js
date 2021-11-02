const {formatCount} = require('../utils.js')

describe("formatCount", () => {
    const data = [{
        article_id: 1,
        title: 'Living in the shadow of a great man',
        body: 'I find this existence challenging',
        votes: 100,
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: '2020-07-09T21:11:00.000Z',
        comment_count: "11"
    }]

    const formattedData = formatCount(data)


    test("it returns a new array", () => {
        expect(formattedData).not.toBe(data)

    })
    test("it converts comment_count string to a number", () => {
        expect(formattedData[0]).toMatchObject({
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