<template>
<div class="ivu-rate">
    <div class="ivu-rate-star" v-for="(item, index) in stars" @mouseover="onMouseoverStar(index)" @click="onClickStar(index)" :class="{
         'ivu-rate-star-full': item.isFull,
         'ivu-rate-star-half': item.isHalf,
         'ivu-rate-star-zero': !item.isFull}">
        <span type="half" class="ivu-rate-star-content" @mouseover.stop="onMouseoverStar(index-0.5)" @click.stop="onClickStar(index-0.5)"></span>
    </div>
    <div class="ivu-rate-text"><span>{{value}}</span> <span>星</span></div>
</div>
</template>

<script>
import {
    props
} from './config';

export default {
    props,

    data() {
        return {
            data: 0,
            stars: []
        }
    },

    mounted() {
        this.data = this.value;
    },

    watch: {
        value(val) {
            this.data = val;
        },

        data() {
            this.intData();
        }
    },

    methods: {
        isFull(i) {
            if (!this.allowHalf) {
                return Math.ceil(i) >= this.data;
            }

            return (i - 0.5) < this.data;
        },

        isHalf(i) {
            if (!this.allowHalf) {
                return false;
            }
            return (i - 1) < this.data && (i - 0.5) >= this.data;
        },

        intData() {
            let list = []
            for (let i = 1; i <= this.count; i++) {
                list.push({
                    value: i,
                    isFull: this.isFull(i),
                    isHalf: this.isHalf(i)
                });
            }

            this.stars = list;
        },

        onMouseoverStar(i) {
            if (this.disabled) {
                return;
            }
            if (!this.allowHalf) {
                this.data = Math.ceil(i + 1);
                return;
            }
            this.data = i + 1;
        },

        onClickStar(i) {
            if (this.disabled) {
                return;
            }
            if (!this.allowHalf) {
                this.data = Math.ceil(i + 1);
                return;
            }
            this.data = i + 1;
            this.$emit('on-change', this.data);
        }

    }
}
</script>
