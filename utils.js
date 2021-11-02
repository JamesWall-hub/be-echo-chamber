exports.formatCount = (data) => {
    const formattedCount = data.map((obj) => {
        return {
            ...obj,
            comment_count: Number(obj.comment_count)
        }
    })
    return formattedCount
}