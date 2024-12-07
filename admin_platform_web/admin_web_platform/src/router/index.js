import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/views/layout/index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'dashboard' }
      },
      {
        path: 'merchant',
        name: 'Merchant',
        component: () => import('@/views/merchant/index.vue'),
        meta: { title: '商家管理', icon: 'merchant' }
      }
      // ... 其他路由配置
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  }
]

const router = new VueRouter({
  routes
})
console.log('路由实例创建成功:', router)

router.beforeEach((to, from, next) => {
  console.log('路由跳转详情:', {
    to: {
      path: to.path,
      name: to.name,
      params: to.params,
      query: to.query
    },
    from: {
      path: from.path,
      name: from.name
    },
    hasToken: store.state.admin.token
  })
  
  const hasToken = store.state.admin.token

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }

  // 设置页面标题
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} - 校园二手交易平台管理系统`
  }
})

export default router 