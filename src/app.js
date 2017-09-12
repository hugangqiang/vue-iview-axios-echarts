import Vue from 'vue';
import iView from 'iview';

import VueRouter from 'vue-router';
import Routers from './router/index.js';

import Util from './libs/util';
import main from './components/main.vue';

//vuex配置文件 
import store from './vuex/store.js';

import 'iview/dist/styles/iview.css';



window.config = require('./config');

Vue.use(VueRouter);
Vue.use(iView);
// 路由配置
const router = new VueRouter({
    mode: 'history',
    routes: Routers()
});


router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(main)
});