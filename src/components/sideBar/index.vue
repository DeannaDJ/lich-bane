<template>
    <Menu :active-name="activeName" :theme="theme" width="auto" :open-names="openItems" @on-select="selectItem">
        <template v-for="item in sideBarList" v-if="item.show">
            <Submenu v-if="item.subItem.length" :name="item.url">
                <template slot="title">
                    <Icon v-if="item.icon" :type="item.icon"></Icon>
                    {{item.displayName}}
                </template>
                <Menu-item v-for="el in item.subItem" :name="el.url" :key="el.url" v-if="el.show">
                    {{el.displayName}}
                </Menu-item>
            </Submenu>
            <Menu-item v-else :name="item.url">
                <Icon v-if="item.icon" :type="item.icon"></Icon>
                {{item.displayName}}
            </Menu-item>
        </template>
    </Menu>
</template>

<script>
import { props } from './config';
export default {
    props: props,
    data() {
        return {
            activeName: ''
        }
    },
    mounted() {
        let vm = this;
        // 初始化数据
        this.initData();
        G.vueHub.$on('onChangeNavBarPath', () => {
            setTimeout(() => {
                vm.initData();
            }, 500);
        });
    },

    methods: {
        isExsitBar(list) {
            let name = '';
            for(let item of list) {
                if(item.subItem && item.subItem.length) {
                    name = this.isExsitBar(item.subItem) || name;
                } else if(this.$route.path.indexOf(item.url) > -1) {
                    name = item.url;
                }
            }
            return name;
        },

        initData() {
            // 初始化激活状态
            this.activeName = this.isExsitBar(this.sideBarList);
        },

        selectItem(name) {
            this.$router.push(name);
        }
    }
}
</script>

<style scoped>
.side-menu {
    width: 200px;
    height: 100%;
}
</style>
