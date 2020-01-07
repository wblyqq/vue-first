import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer'
import Rank from '../components/rank/rank'
import Search from '../components/search/search'
import User from '../components/user/user'
import Error from '../components/error/error'
import Home from '../components/home/home'
import store from '../store/store'
import types from '../store/types'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/rank'
    },
    {
      path: '/recommend',
      component: Recommend,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '*',
      component: Error,
      name: 'error'
    }
  ]
})

if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登陆权限
    if (store.state.token) { // 通过vuex state 获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/user',
        query: {redirect: to.fullPath} // 跳转的路由path作为参数
      })
    }
  } else {
    next()
  }
})

export default router
