const user_log_define = {
    definition: {
        userId: String,
        platform: String,
        type: String,
        info: Object
    },
    options: {
        collection: 'user_log',
        timestamps:true
    }
}

module.exports = user_log_define