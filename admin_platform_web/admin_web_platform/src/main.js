import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.scss'
import VueRouter from 'vue-router'

Vue.use(ElementUI)
Vue.use(VueRouter)

// 添加错误处理
Vue.config.productionTip = false
Vue.config.errorHandler = function(err, vm, info) {
  console.error('Vue Error:', err, info)
}

// 开发环境下的调试信息
if (process.env.NODE_ENV === 'development') {
  console.log('Vue version:', Vue.version)
  console.log('Current route:', router.currentRoute)
  console.log('Store state:', store.state)
  router.onReady(() => {
    console.log('路由初始化完成')
    console.log('当前路由信息:', {
      currentRoute: router.currentRoute,
      path: router.currentRoute.path,
      matched: router.currentRoute.matched
    })
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
