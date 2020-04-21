/*
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:08:48
 * @LastEditors: Roc
 * @LastEditTime: 2019-11-04 13:45:40
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import filters from './filters/index';
import wechat from '@/common/wechat/index';
import axios from 'axios';
import title from 'vue-wechat-title'
Vue.use(title);
import 'vue-ydui/dist/ydui.base.css';
import { CountDown } from "vue-ydui/dist/lib.rem/countdown";
Vue.component(CountDown.name, CountDown);
// import VueResource from 'vue-resource';
// Vue.use(VueResource);
// Vue.http.options.emulateJSON = true;

Vue.prototype.$axios = axios
Vue.use(wechat);

// 注入全局过滤器
Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item])
})
// const wx = Vue.wechat;
// wx.config({
//     appId: '',
//     nonceStr: '',
//     signature: '',
//     timestamp: '',
//     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
// })
Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
