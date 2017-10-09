<template>
<Row>
    <div class="layout-logo">
        <Icon type="home" size=30 color="#fff"></Icon>
        <a class="navbar-brand" href="javascript:void(0);">运营门户</a>
    </div>
    <Menu class="layout-menu" mode="horizontal" theme="dark" :active-name="activeName" @on-select="selectItem" style="height: 49px;">
        <div class="layout-nav" v-if="leftNav">
            <Menu-item v-for="(item, key) in leftNav" v-if="item.show" :key="key" :name="key">{{item.displayName}}</Menu-item>
        </div>
        <div class="navbar-right" v-if="rightNav">
            <Menu-item v-for="(item, key) in rightNav" v-if="item.show" :key="key" :name="key">
                <Badge v-if="item.icon" :count="item.count">
                    <span class="nav-bar-icon">
                        <Icon :type="item.icon" size=24></Icon>
                    </span>
                </Badge>
                <span v-if="item.displayName">{{item.displayName}}</span>
            </Menu-item>
        </div>
    </Menu>
</Row>
</template>

<script>
import {
    props
} from './config';

export default {
    props,
    data: function() {
        return {
            activeName: '/'
        }
    },
    mounted() {
        let vm = this;
        // 数据初始化
        vm.initData();

        G.vueHub.$on('onChangeNavBarPath', () => {
            setTimeout(() => {
                vm.initData();
            }, 500);
        });
    },

    methods: {
        initData() {
            // 初始化激活状态
            this.activeName = '/' + this.$route.path.split('/')[1];
        },

        // 选择item
        selectItem(name) {
            if (name == 'logout') {
                this.logout();
            } else if (name == 'profile') {

            } else {
                this.$router.push(name);
            }
        },

        // 登出
        logout() {
            window.location.href = "/account/logout/";
        }
    }
}
</script>

<style lang="scss" scoped="true" type="text/css">
$navbarHeight: 49px;

.layout-logo {
    float: left;
    width: 200px;
    height: $navbarHeight;
    line-height: $navbarHeight;
    text-align: center;
    background: #313540;
    z-index: 1;

    .ivu-icon {
        vertical-align: sub;
        margin-right: 5px;
    }

    .navbar-brand {
        font-size: 18px;
        color: #fff;
        font-weight: bold;
    }
}
.layout-menu {
    margin-left: 200px;
}
.layout-nav {
    float: left;
    height: inherit;
    font-weight: bold;
    font-size: 16px;
}
.navbar-right {
    float: right;
    font-weight: bold;
    font-size: 16px;
}

.ivu-menu-item {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    line-height: $navbarHeight;
    height: $navbarHeight;
    &.ivu-menu-item-active,
    &:hover {
        background: #080808;
    }
}

.header-user-item {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: $navbarHeight;
    padding: 0 18px;
    display: inline-block;
    vertical-align: middle;
    color: #555;
    border-left: 1px solid #eee;
}
.header-user-item:hover {
    background: #f5f7f9;
}

.nav-bar-icon {
    display: inline-block;
    padding: 0 5px;
}
</style>
