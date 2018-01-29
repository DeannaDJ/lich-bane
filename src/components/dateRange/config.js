export let props = {
    format: {
        type: String,
        default: 'yyyy-MM-dd HH:mm'
    },
    rangeDate: {
        type: Array,
        default: null
    },
    startLabel: {
        type: String,
        default: '开始时间'
    },
    endLabel: {
        type: String,
        default: '结束时间'
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
