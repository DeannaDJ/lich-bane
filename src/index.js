
import Vue from 'vue';
import iView from 'iview';
import Layout from './components/layout/index.vue';
import NavBar from './components/navBar/index.vue';
import Loading from './components/loading/index.vue';
import SideBar from './components/sideBar/index.vue';
import Suggest from './components/suggest/index.vue';
import StarRate from './components/starRate/index.vue';
import DateRange from './components/dateRange/index.vue';
import SpinLoading from './components/spinLoading/spin-loading.js';

window.Vue = window.Vue || Vue;
window.iView = window.iView || iView;
const lichBane = {
    Layout,
    NavBar,
    Loading,
    SideBar,
    Suggest,
    StarRate,
    DateRange
};

const install = function (Vue, opts = {}) {
    Object.keys(lichBane).forEach((key) => {
        Vue.component(key, lichBane[key]);
    });
    Vue.prototype.$SpinLoading = SpinLoading;
    Vue.use(Object.assign(iView, lichBane));
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(lichBane, {install});   // lichBane组件
