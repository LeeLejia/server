const tree_define = {
    definition: {
        id: String,
        more: Object,
        user: String,
        name: String,
        article: String,
        children: Object
    },
    options: {
        collection: 'wiki_tree',
        timestamps:true
    }
}

module.exports = tree_define