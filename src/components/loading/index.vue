<template>
<Spin size="large" fix v-if="loading" class="spin-load">
    <div class="shade"></div>
    <Icon type="load-a" size=40 class="icon"></Icon>
    <div class="show-text">{{showText}}</div>
</Spin>
</template>

<script>
import {
    props
} from "./config.js";

export default {
    props
}
</script>
<style lang="scss" scoped="true" type="text/css">
@keyframes ani-spin {
    from {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spin-load {
    width: 100%;
    height: 500px;
    .icon {
        animation: ani-spin 0.7s linear infinite;
    }
}

.ivu-spin-fix {
    position: fixed;
    top: 49px;
    left: 0;
    background: transparent;
    z-index: 9999;
    .shade {
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        width: 100%;
        height: 100%;
    }
    .show-text {
        color: #fff;
        opacity: 0.99;
    }
}
</style>
