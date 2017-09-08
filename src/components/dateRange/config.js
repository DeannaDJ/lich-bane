export let props = {
    format: {
        type: String,
        default: 'yyyy-MM-dd HH:mm'
    },
    rangeDate: {
        type: Array,
        default: null
    },

    startPlaceholder: {
        type: String,
        default: '请选择开始时间'
    },

    endPlaceholder: {
        type: String,
        default: '请选择结束时间'
    }
}
