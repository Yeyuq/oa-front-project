import Vue from 'vue'
import Router from 'vue-router'
import layout from '../views/layout/layout'

Vue.use(Router)

const _import = require('./_import_' + process.env.NODE_ENV)
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/login'),
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    hidden:true,
    component: _import('register/register')
  },
  {
    path: '/',
    redirect:'/dashboard',
    component: layout,
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/dashboard')
    }]
  }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path:'/administration',
    component:layout,
    meta:{title:'行政办公'},
    children:[
      {
        path:'myTask',
        name:'我的任务',
        component:_import('administration/myTask'),
        meta:{title: '我的任务'},
        menu:'user'
      },
      {
        path:'newTask',
        name:'新建任务',
        component:_import('administration/newTask'),
        meta:{title: '新建任务'},
        menu:'user'
      },
      {
        path:'setTime',
        name:'设置任务时间',
        component:_import('administration/setTime'),
        meta:{title: '设置任务时间'},
        menu:'user'
      },
      {
        path:'assignment',
        name:'分配任务',
        component:_import('administration/assignment'),
        meta:{title: '分配任务'},
        menu:'user'
      },
    ]
  }
]
