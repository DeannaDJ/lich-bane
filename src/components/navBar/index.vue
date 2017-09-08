<template>
<Row>
    <Col span="4">
    <div class="layout-logo">
        <a class="navbar-brand" href="javascript:void(0);">demo</a>
    </div>
    </Col>
    <Col span="20" offset="4">
    <Menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="selectItem" style="height: 49px;">
        <div class="layout-nav">
            <Menu-item v-for="item in leftNav" v-if="item.show" :key="item.url" :name="item.url">{{item.displayName}}</Menu-item>
        </div>
        <div class="navbar-right">
            <Menu-item v-for="item in rightNav" v-if="item.show" :key="item.url" :name="item.url">{{item.displayName}}</Menu-item>
            <Menu-item key="profile" name="profile">
                {{user.name || user.email || user.mobile}}
            </Menu-item>
            <Menu-item key="logout" name="logout">
                <Badge>
                    <Icon type="log-out" size=24></Icon>
                </Badge>
            </Menu-item>
        </div>
    </Menu>
    </Col>
</Row>
</template>

<script>
import {
    navList
} from './config';

export default {
    props: ['user'],
    data: function() {
        return {
            activeName: '/test',
            leftNav: navList.left,
            rightNav: navList.right,
            warningCount: 0
        }
    },
    mounted() {
        let vm = this;
        // 数据初始化
        vm.initData();
        vm.onFetchWarningCount();

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
            window.location.href = "/";
        }
    }
}
</script>

<style lang="scss" scoped="true" type="text/css">
$navbarHeight: 49px;

.layout-logo {
    position: absolute;
    width: 100%;
    height: $navbarHeight;
    line-height: $navbarHeight;
    left: 0;
    text-align: center;
    background: #313540;

    .navbar-brand {
        font-size: 18px;
        color: #fff;
        font-weight: bold;
    }
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

.warn-icon {
    display: inline-block;
    padding: 0 5px;
}
</style>
