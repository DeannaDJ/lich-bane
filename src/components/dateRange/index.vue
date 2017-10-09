<template>
<div class="date-time">
    <label class="label-text">开始时间</label>
    <DatePicker type="datetime" :value="startTime" :format="format" :placeholder="startPlaceholder" class="pe-w200" @on-clear="onChangeStart" @on-change="onChangeStart"></DatePicker>
    <label class="label-text">结束时间</label>
    <DatePicker type="datetime" :value="endTime" :format="format" :placeholder="endPlaceholder" class="pe-w200" @on-clear="onChangeEnd" @on-change="onChangeEnd"></DatePicker>
</div>
</template>

<script>
import {
    props
} from "./config.js";
import dateUtil from "../../utils/date.js";

export default {
    props,
    data() {
        return {
            dateTime: '',
            startTime: null,
            endTime: null
        }
    },
    mounted() {
        this.initData();
    },

    watch: {
        rangeDate() {
            this.initData();
        }
    },

    methods: {
        initData() {
            if (!this.rangeDate || this.rangeDate && this.rangeDate.length < 2) {
                return;
            }

            if (dateUtil.compare(this.rangeDate[0], this.rangeDate[1]) > -1) {
                this.$Message.warning('起始时间不能大于或者等于结束时间！');
                return;
            }

            this.startTime = dateUtil.dateFormat(this.rangeDate[0], this.format);
            this.endTime = dateUtil.dateFormat(this.rangeDate[1], this.format);
        },

        onChangeStart(val) {
            if (val && (!this.endTime || (this.endTime && dateUtil.compare(val, this.endTime) > -1))) {
                this.endTime = dateUtil.getDisDate(val, 1, this.format);
            }
            this.startTime = val;
            this.$emit('on-change', [this.startTime, this.endTime]);
        },

        onChangeEnd(val) {
            if (val && (!this.startTime || (this.startTime && dateUtil.compare(this.startTime, val) > -1))) {
                this.startTime = dateUtil.getDisDate(val, -1, this.format);
            }
            this.endTime = val;
            this.$emit('on-change', [this.startTime, this.endTime]);
        }
    }
}
</script>
<style lang="scss" type="text/css" scoped="true">
.date-time {
    display: inline-block;
}
.label-text {
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 10px;
}
.split-line {
    display: inline-block;
    width: 30px;
    text-align: center;
}
</style>
