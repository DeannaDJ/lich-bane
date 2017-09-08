<template>
    <Spin size="large" fix v-if="show" class="spin-load">
        <div class="shade"></div>
        <Icon type="load-a" size=40  class="icon"></Icon>
        <div class="show-text">{{showText}}</div>
    </Spin>
</template>

<script>

export default {
    data() {
        return {
            show: false,
            showText: ''
        };
    }
}
</script>
<style lang="scss" scoped="true" type="text/css">
@keyframes ani-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
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
