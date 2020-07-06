import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './assets/css/style.scss'
import './assets/icon-font/iconfont.css'

import 'ant-design-vue/dist/antd.css'
import antd from 'ant-design-vue'
Vue.use(antd)

import lrz from 'lrz'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

import Vant, { Toast, Dialog } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(Toast)
Vue.prototype.$dialog = Dialog

import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
