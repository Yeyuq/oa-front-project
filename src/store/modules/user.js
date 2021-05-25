import {getToken, removeToken, setToken} from '../../utils/auth'
import {default as api} from '../../utils/api'
import store from '../../store'
import router from '../../router'

const user = {
  state: {
    //user
    username: '',
    userId: '',
    role: '',
    menus: [],
    permissions: [],
    avatar:'',
    // avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F28%2F20190528143150_fETNW.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624365601&t=7d3a9e920bc71e0d16f6312a02cde5d6'
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.username = userInfo.username
      state.userId = userInfo.userId
      state.role = userInfo.roleName
      state.menus = userInfo.menuList
      state.permissions = userInfo.permissionList
      state.avatar=userInfo.avatarUrl
    },
    RESET_USER: (state) => {
      state.username = ''
      state.userId = ''
      state.role = ''
      state.menus = []
      state.permissions = []
    },
    SET_AVATAR:(state,urlData)=>{
      state.avatar=urlData
    }
  },
  actions: {
    // 登录
    Login ({commit, state}, LoginForm) {
      console.log(LoginForm)
      return new Promise((resolve, reject) => {
        api({
          url: '/api/login',
          method: 'post',
          data: LoginForm
        }).then(data => {
          if (data.result === 'success') {
            //cookie中保存前端登录状态
            console.log('还是让我登陆教你做事吧')
            console.log(data)
            setToken()
          }
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    GetInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/getInfo',
          method: 'post'
        }).then(data => {
          console.log('++++++++++')
          console.log(data)
          //储存用户信息
          commit('SET_USER', data.userPermission)
          //cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
          setToken()
          //生成路由
          let userPermission = data.userPermission
          console.log(userPermission)
          store.dispatch('GenerateRoutes', userPermission).then(() => {
            //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
            router.addRoutes(store.getters.addRouters)
          })
          console.log('done 1')
          resolve(data)
        }).catch(error => {
          console.log('done 2')
          reject(error)
        })
      })
    },
    //注册
    Register ({commit, state}, registerForm) {
      console.log(registerForm)
      return new Promise((resolve, reject) => {
        api({
          url: '/api/register',
          method: 'get',
          data: registerForm
        }).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登出
    LogOut ({commit}) {
      return new Promise((resolve) => {
        api({
          url: '/api/logout',
          method: 'post'
        }).then(data => {
          commit('RESET_USER')
          removeToken()
          resolve(data)
        }).catch(() => {
          commit('RESET_USER')
          removeToken()
        })
      })
    },
    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    },
    //日历添加日程 dialogForm
    SetDialogForm ({commit, state}, form) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/setDialogForm',
          method: 'post',
          data: form
        }).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 日历删除日程
    DelSch ({commit, state}, delMsg) {
      console.log('删除的信息是：')
      console.log(delMsg)
      return new Promise((resolve) => {
        api({
          url: '/api/delSch',
          method: 'post',
          data: delMsg
        }).then(data => {
          resolve(data)
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 日历日程已完成
    FinSch ({commit, state}, FinMsg) {
      console.log('删除的信息是：')
      console.log(FinMsg)
      return new Promise((resolve) => {
        api({
          url: '/api/finSch',
          method: 'post',
          data: FinMsg
        }).then(data => {
          resolve(data)
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    },
    // 获取日程列表
    SchList ({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/schList',
          method: 'post'
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取公告列表
    NoticeList ({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/noticeList',
          method: 'post'
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取公告界面列表
    PageNoticeList ({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/pageNoticeList',
          method: 'post'
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取用户个人信息设置列表
    UserSetInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/userSetInfo',
          method: 'post'
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //用户头像
    UserAvatar ({commit, state},fileList) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/userAvatar',
          method: 'post',
          data:fileList
        }).then(data => {
          commit('SET_AVATAR',fileList)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //更改用户电话
    UserPhone ({commit, state},phoneData) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/userSetPhone',
          method: 'post',
          data:phoneData
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //更改用户介绍
    UserIntroduce ({commit, state},introduceData) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/userSetIntroduce',
          method: 'post',
          data:introduceData
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取用户搜索列表
    NameList ({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/api/userNickName',
          method: 'post'
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default user
