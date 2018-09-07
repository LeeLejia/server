const article_define = {
    definition: {
        id: String,
        user: String,
        type: String,
        info: Object,
        content: String,
    },
    options: {
        collection: 'wiki_article',
        timestamps:true
    }
}

module.exports = article_define


