
<template>
<Row>
    <Col class="layout-menu-left">
    <SideBar :theme="theme" :side-bar-list="sideBarList" :open-items="openItems"></SideBar>
    </Col>
    <Col class="layout-container">
    <Row class="layout-breadcrumb">
        <Breadcrumb v-model="path">
            <Breadcrumb-item v-for="item in paths" v-if="item" :key="item.fullpath" :href="item.fullpath">{{item.name}}</Breadcrumb-item>
        </Breadcrumb>
    </Row>
    <Row class="layout-content">
        <slot name="layout-content-main"></slot>
    </Row>
    </Col>
</Row>
</template>
<script>
import SideBar from '../sideBar/index.vue';

import {
    props
} from './config'

export default {
    props,

    data() {
        return {
            path: ''
        }
    },

    components: {
        SideBar
    },

    computed: {
        paths: function() {
            let path = this.path;
            let fullpath = '';
            return _.map(path.split('/'), function(item, index) {
                if (index === 0) {
                    fullpath += '/';
                }
                if (item && index > 1) {
                    fullpath += '/';
                }
                fullpath += item;

                let name = (URI_NAMES || {})[fullpath];
                // 未自定义bread名称的情况
                if (!name) {
                    name = item;
                    fullpath = path;
                }
                return {
                    fullpath: fullpath,
                    name: name
                };
            });
        }
    },

    mounted() {
        this.path = this.$route.path;
        this.$router.beforeEach((to, from, next) => {
            this.path = to.path;
            next();
        });
    },

    watch: {
        path(val) {
            if (!val) {
                return;
            }
            let paths = val.split('/');
            let sub_path = G.fetchSubActivedName(paths.slice(1).join('/'));
            if (sub_path) {
                this.$router.push(sub_path);
                return;
            }
        }
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped="true" type="text/css">
.layout-menu-left {
    position: fixed;
    top: 50px;
    left: 0;
    width: 200px;
    height: 100%;
    overflow-y: auto;
    box-shadow: 2px 0 4px #f2f2f2;
    z-index: 1;
}

.layout-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 65px 15px 15px 215px;
    overflow-y: auto;
    .layout-content {
        padding: 10px;
    }
}

.layout-breadcrumb {
    padding: 5px 10px;
}

.layout-copy {
    margin: 10px;
    text-align: center;
}
</style>
