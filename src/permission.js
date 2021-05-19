import router from './router'
import store from './store'
//import NProgress from 'nprogress' // Progress 进度条
//import 'nprogress/nprogress.css' // Progress 进度条样式
import {getToken} from './utils/auth' // 验权
const whiteList = ['/login', '/404' ,'/register'] //白名单,不需要登录的路由
router.beforeEach((to, from, next) => {
  // console.log('to')
  // console.log({...to})
  // console.log('from')
  // console.log({...from})
  // console.log('store.getters.role')
  // console.log(store.getters.role)

  console.log(getToken())
  if (getToken()) {
    //如果已经登录
    if (to.path === '/login') {
      console.log('has Login path /login to workspace')
      next({path: '/'})
      //next()
      //NProgress.done() // 结束Progress
    } else if (!store.getters.role) {
      console.log('我在这里')
      store.dispatch('GetInfo').then(() => {
        console.log('has Login path !/login to path')
        console.log(store.getters.role)
        //next()
        console.log('我跳了吗')
        //next('/layout')
        next({...to})
      })
    } else {
      console.log('now 2')
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    //如果前往的路径是白名单内的,就可以直接前往
    next()
  } else {
    //如果路径不是白名单内的,而且又没有登录,就跳转登录页面
    console.log('1213123123312')
    store.commit('RESET_USER')
    next('/login')
    //NProgress.done() // 结束Progress
  }
})
// router.afterEach(() => {
//   //NProgress.done() // 结束Progress
// })
