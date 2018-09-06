const user_define = {
    definition: {
        phone: String,
        wx: String,
        nick: String,
        more: Object
    },
    options: {
        collection: 'knowu_users',
        timestamps:true
    }
}

module.exports = user_define