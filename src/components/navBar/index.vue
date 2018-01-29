<template>
<Row class="pe-header">
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
            let paths = this.$route.path.split('/');
            this.activeName = '/' + paths[1];
            let sub_path = G.fetchSubActivedName(paths.slice(1).join('/'));
            if (sub_path) {
                this.$router.push(sub_path);
                return;
            }
        },

        // 选择item
        selectItem(name) {
            G.vueHub.$emit('navActiveKey', name);
            this.activeName = name;
            if (name == 'profile') {
                return;
            }

            if (this.leftNav[name] && this.leftNav[name].url) {
                window.location.href = this.leftNav[name].url;
                return;
            }
            if (this.rightNav[name] && this.rightNav[name].url) {
                window.location.href = this.rightNav[name].url;
                return;
            }
            localStorage.setItem('navActiveKey', name);

            let paths = name.split('/');
            let sub_path = G.fetchSubActivedName(paths.slice(1).join('/'));
            if (sub_path) {
                this.$router.push(sub_path);
                return;
            }
            this.$router.push(name);
        }
    }
}
</script>

<style lang="scss" scoped="true" type="text/css">
$navbarHeight: 49px;

.pe-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    min-width: 1200px;
}

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
