const log_define = {
    definition: {
        platform: String,
        type: String,
        user: String,
        ip: String,
        msg: String,
        info: Object,
        call_stack:String,
    },
    options: {
        collection: 'logs',
        timestamps:true
    }
}

module.exports = log_define