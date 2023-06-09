import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import store from '@/store/index.js'
import myhttp from './api/myhttp.js'
import config from './api/config.js'
import moment from 'moment'
Vue.prototype.$moment = moment

Vue.prototype.$baseUrl=config.baseUrl
Vue.prototype.$store = store

Vue.prototype.$myhttp=myhttp
Vue.prototype.$topicColor='#FFB600'

Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  // uni.addInterceptor({
  //   returnValue(res) {
  //     if (!isPromise(res)) {
  //       return res;
  //     }
  //     return new Promise((resolve, reject) => {
  //       res.then((res) => {
  //         if (res[0]) {
  //           reject(res[0]);
  //         } else {
  //           resolve(res[1]);
  //         }
  //       });
  //     });
  //   },
  // });
} catch (error) { 
	console.log('Promise Error',error)	
}

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { log } from 'console'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif