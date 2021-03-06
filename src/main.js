// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueWechat from 'vue-wechat-title'
import store from './store/store.js'

import './assets/css/weui.min.css'
import './assets/css/jquery-weui.min.css'
import './assets/css/common.css'
import './assets/js/fastclick.js'
import './assets/js/jquery-weui.js'
import './assets/js/common.js'
import './assets/js/fontSize.js'

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VueWechat);

Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next)  => {
  $.showLoading();
  request.jsonp = 'callback';
  next((response)=>{
  	setTimeout(function(){
  		$.hideLoading();
  	});
  });
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
