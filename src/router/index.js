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
    hidden: true,
    component: _import('register/register')
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: layout,
    name: '首页',
    hidden: true,
    children: [
      {
        path: 'dashboard', component: _import('dashboard/dashboard')
      },
      {
        path: 'userSettings', component: _import('userSettings/userSettings'),meta: {title: '个人主页'},name: '个人主页',
      },
      {
        path: 'bulletinView', component: _import('bulletinView/bulletinView'),meta: {title: '全部公告'},name: '全部公告',
      }
    ]
  }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  //行政办公
  {
    path: '/administration',
    component: layout,
    meta: {title: '行政办公', icon: 'el-icon-suitcase'},
    children: [
      {
        path: 'myTask',
        name: '我的任务',
        component: _import('administration/myTask'),
        meta: {title: '我的任务'},
        menu: 'common'
      },
      {
        path: 'newTask',
        name: '新建任务',
        component: _import('administration/newTask'),
        meta: {title: '新建任务'},
        menu: 'common'
      },
      {
        path: 'setTime',
        name: '设置任务时间',
        component: _import('administration/setTime'),
        meta: {title: '设置任务时间'},
        menu: 'common'
      },
      {
        path: 'assignment',
        name: '分配任务',
        component: _import('administration/assignment'),
        meta: {title: '分配任务'},
        menu: 'admin'
      },
    ]
  },
  //审批申请
  {
    path: '/approval',
    component: layout,
    meta: {title: '审批申请', icon: 'el-icon-document-checked'},
    children: [
      {
        path: 'applyFor',
        name: '申请假勤',
        component: _import('approval/applyFor'),
        meta: {title: '申请假勤'},
        menu: 'common'
      },
      {
        path: 'approvalRequest',
        name: '审批假勤',
        component: _import('approval/approvalRequest'),
        meta: {title: '审批假勤'},
        menu: 'admin'
      },
      {
        path: 'individual',
        name: '个人出勤',
        component: _import('approval/individual'),
        meta: {title: '个人出勤'},
        menu: 'common'
      },
      {
        path: 'viewStatus',
        name: '查看员工状态',
        component: _import('approval/viewStatus'),
        meta: {title: '查看员工状态'},
        menu: 'admin'
      },
    ]
  },
  //日志管理
  {
    path: '/daily',
    component: layout,
    meta: {title: '日志管理', icon: 'el-icon-notebook-1'},
    children: [
      {
        path: 'myDaily',
        name: '查看我的日志',
        component: _import('daily/myDaily'),
        meta: {title: '查看我的日志'},
        menu: 'common'
      },
      {
        path: 'writeDaily',
        name: '填写日志',
        component: _import('daily/writeDaily'),
        meta: {title: '填写日志'},
        menu: 'common'
      }
    ]
  },
]
