const statistics_define = {
    definition: {
        display_name: String,
        statistics_index: String,
        order: Number,
        status: Number,
        dm: String,
        action: String,
        dimensions: Array,
        is_drop_duplicate: Boolean,
        calculate_interval: Boolean,
        field: String,
        methods: Array,
        custom_filter: Array,
        mapping: {
            at: String,
            cd: String,
            cv: String
        }
    },
    options: {
        collection: 'statistics_define',
        timestamps:true
    }
}

module.exports = statistics_define