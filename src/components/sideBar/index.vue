<template>
    <Menu :active-name="activeName" width="auto" :open-names="openItems" @on-select="selectItem">
        <template v-for="item in sideBarList">
            <Submenu v-if="item.subItem.length" :name="item.url">
                <template slot="title">
                    {{item.displayName}}
                </template>
                <Menu-item v-for="el in item.subItem" :name="el.url" :key="el.url">
                    {{el.displayName}}
                </Menu-item>
            </Submenu>
            <Menu-item v-else :name="item.url">
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
        // 初始化数据
        this.initData();
    },
    methods: {
        initData() {
            // 初始化激活状态
            this.activeName = this.$route.path;
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
