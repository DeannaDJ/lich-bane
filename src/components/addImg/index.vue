<template>
<div class="uploadify-wrapper">
    <div class="upload-btn" v-show="!uploading&&imgList.length < max">
        <div :id="id"></div>
        <Icon class="plus-icon" size="35" type="plus-round"></Icon>
    </div>
    <div class="upload-btn" v-show="uploading">
        <Icon class="plus-icon" size="35" type="plus-round"></Icon>
        <p class="pe-mt5">上传中...</p>
    </div>
    <div class="uploadify-queue imgs-list pe-clear" :id="queueId">
        <div v-for="(item, index) in imgList" :key="index" :class="'img-item img-item_' + index">
            <div class="head-wrapper text-center">
                <a target="_blank" :href="item.original_url">
                    <img alt="点击放大" height="100" width="100" :src="item.thumb_url">
                </a>
                <a v-if="!item.isOriginal" href="javascript:void(0);" @click="onDeleteImg(index)">
                    <Icon class="delete-btn" type="ios-trash-outline"></Icon>
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    props
} from "./config";

// 队列模板
let itemTemplate = '<div id="${fileID}" class="uploadify-queue-item">' +
    '<div class="uploadify-progress">' +
    '<div class="uploadify-progress-bar">' +
    '</div></div></div>';

export default {
    props,

    data() {
        return {
            up: null,
            uploading: false,
            imgList: []
        }
    },

    mounted() {
        this.upload();
    },

    watch: {
        imageList(val) {
            if(val.length != this.imgList.length) {
                this.imgList = val || [];
            }
        }
    },

    methods: {
        onDeleteImg(index) {
            let vm = this;
            $('.img-item_' + index).fadeOut();
            let list = vm.imgList.filter((img, i) => {
                return i != index;
            });
            vm.$emit('on-change', list);

            setTimeout(() => {
                vm.imgList = list;
                $('.img-item').show();
            }, 500)
        },

        onUploadComplete(file, res) {
            let vm = this;
            let data = (JSON.parse(res) || {}).data || {};
            if(!data.original_url) {
                vm.uploading = false;
                return;
            }
            let img = {
                original_url: data.original_url,
                thumb_url: data.original_url + "?imageView2/0/w/100/h/100"
            };
            setTimeout(() => {
                vm.imgList.push(img);
                vm.$emit('on-change', vm.imgList);
                vm.uploading = false;
            }, 500);
        },

        upload() {
            let vm = this;
            vm.up = $('#' + vm.id).Huploadify({
                auto: true,
                buttonText: '添加图片',
                queueID: vm.queueId,
                itemTemplate,
                fileTypeExts: '*.jpg;*.png;*.bmp;*.PNG;*.JPG',
                multi: false,
                fileSizeLimit: 9999,
                showUploadedPercent: false,
                removeTimeout: 50,
                uploader: '/image-upload',
                onUploadStart: function() {
                    vm.uploading = true;
                },
                onUploadComplete: vm.onUploadComplete,
                onClearQueue: function(queueItemCount) {
                    // console.log('有' + queueItemCount + '个文件被删除了');
                },
                onDestroy: function() {
                    // console.log('destroyed!');
                },
                onSelect: function(file) {
                    // console.log(file.name + '加入上传队列');
                },
                onQueueComplete: function(queueData) {
                    // console.log('队列中的文件全部上传完成', queueData);
                }
            });
        }
    }
}
</script>

<style lang="scss" type="text/css">
.uploadify-wrapper {
    position: relative;
    width: 800px;
    max-height: 232px;
    overflow-y: auto;
    overflow-x: hidden;

    .upload-btn {
        position: relative;
        float: left;
        width: 100px;
        height: 100px;
        cursor: pointer;
        padding: 20px 0;
        background: #fff;
        border: 1px dashed #ddd;
        border-radius: 2px;
        font-family: 'Microsoft YaHei';
        color: #666;
        font-size: 12px;
        text-align: center;
        margin: 10px 10px 0 0;
        z-index: 1;
        &:hover {
            border-style: solid;
            box-shadow: 0 0 8px #ddd;
        }
        .plus-icon {
            color: #ddd;
            margin-bottom: 3px;
        }
    }

    .uploadify-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 12px;
        padding-top: 65px;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 30px;
        text-align: center;
        color: #666;
        display: block;
        border: 0;
        outline: 0;
        border-radius: 3px;
        text-shadow: 0;
        &.disabled {
            background-color: #d0d0d0;
            color: #808080;
        }
        &:hover {
            color: #09f;
        }
    }

    .uploadify-queue {
        margin-bottom: 1em;
    }

    .uploadify-error {
        background-color: #fde5dd!important;
    }

    .uploadify-queue-item {
        position: relative;
        border: 1px solid #ddd;
        &.completed {
            background-color: #e5e5e5;
        }

        .uploadify-progress {
            position: absolute;
            background-color: #fff;
            width: 90px;
            height: 8px;
            padding: 1px;
            border-radius: 8px;
            margin-top: -5px;
            margin-left: -45px;
            top: 50%;
            left: 50%;
        }

        .uploadify-progress-bar {
            background-color: #09f;
            height: 100%;
            width: 1px;
            border-radius: 8px;
        }
    }

    .imgs-list {
        .img-item,
        .uploadify-queue-item {
            float: left;
            width: 100px;
            height: 100px;
            border-radius: 3px;
            margin: 10px 10px 0 0;
            padding: 0;
            border-color: #fff;
            background: #eee;
            &:hover {
                border: 0;
                box-shadow: 0 0 8px #ddd;
            }
        }

        .head-wrapper {
            position: relative;
        }

        .delete-btn {
            position: absolute;
            top: 2px;
            right: 2px;
            padding: 3px;
            background: #fff;
            color: #999;
            font-size: 20px;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            text-align: center;
            cursor: pointer;
            border: 1px solid #eee;
            &:hover {
                color: #09f;
            }
        }
    }
}
</style>
