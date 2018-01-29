export let props = {
    id: {
        type: String,
        default: 'upload'
    },
    queueId: {
        type: String,
        default: 'fileUploadQueue'
    },

    max: {
        type: Number,
        default: 20
    },

    imageList: {
        type: Array
    }
};
