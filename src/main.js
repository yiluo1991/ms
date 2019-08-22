import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConfig from './router';
import App from './vue/App';
Vue.use(VueRouter);
var router=new VueRouter(routerConfig);
new Vue({
    el:"#app",
    render: (h)=> h(App),
    router: router 
})
