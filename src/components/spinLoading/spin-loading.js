import Loading from './index.vue';
import Vue from 'vue';

Loading.newInstance = properties => {
    const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render(h) {
            return h(Loading, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const loading = Instance.$children[0];

    return {
        update(options) {
            if (options.showText) {
                loading.showText = options.showText;
            }
            if('show' in options) {
                loading.show = options.show;
            }
        },
        component: loading,
        destroy() {
            let load_el = document.getElementsByClassName('spin-load');
            if(load_el.length) {
                document.body.removeChild(load_el[0]);
            }
        }
    };
};

let loadingInstance;
let showText = '加载中，请稍后...';

// 获取实例
let getLoadingInstance = () => {
    loadingInstance = loadingInstance || Loading.newInstance({
        showText: showText
    });

    return loadingInstance;
}

// 更新属性
let update = (options) => {
    let instance = getLoadingInstance();
    instance.update(options);
}

export default {
    show (text) {
        update({
            show: true,
            showText: text || showText
        });
   },
   hide () {
       let instance = getLoadingInstance();
       loadingInstance = null;
       instance.destroy();
   }
}
