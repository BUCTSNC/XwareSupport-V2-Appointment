import Vue from 'vue'
import App from './App'
import uview from 'uview-ui'
import store from './store'

Vue.use(uview)
Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})

import httpConfig from '@/common/httpSetting.js' //引入请求设置
Vue.use(httpConfig, app)

import httpApi from '@/common/api.js' //引入集中api
Vue.use(httpApi, app)

app.$mount()
